import json
from typing import List, Any
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import uvicorn

from data_processors.predict_categories import Database, EFB
from data_processors.product_name_ngram import ProductNameNgram
from data_processors.autocompleter import NameAutoCompleter
from fastapi.middleware.cors import CORSMiddleware
from models import ProductDB, ProductCreate, ProductNamePredictions, ProductInfo, Category
from parsers.wildberris import WildberriesParser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

super_parser = WildberriesParser()

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["product_database"]

cte_storage = Database()

name_auto_completer = NameAutoCompleter("./resources/sorted_words.txt")
product_name_ngram = ProductNameNgram(tokens_path="./resources/tokens.txt")

categories = EFB(path_to_np="./resources/file_numpy.npy")

with open('./resources/cat2topprop.json') as json_file:
    characteristics_storage = json.load(json_file)


@app.post("/products/", response_model=ProductDB)
async def create_product(product: ProductCreate):
    product_dict = product.dict(by_alias=True)
    new_product = await db["products"].insert_one(product_dict)
    created_product = await db["products"].find_one({"_id": new_product.inserted_id})
    return ProductDB.from_mongo(created_product)


@app.get("/products/{product_id}", response_model=ProductDB)
async def get_product(product_id: str):
    product = await db["products"].find_one({"_id": ObjectId(product_id)})
    if product:
        return ProductDB.from_mongo(**product)
    raise HTTPException(status_code=404, detail="Product not found")


@app.get("/products/", response_model=List[ProductDB])
async def get_all_products():
    products_cursor = db["products"].find()
    products = await products_cursor.to_list(length=100)
    return [ProductDB.from_mongo(product) for product in products]


@app.put("/products/{product_id}", response_model=ProductDB)
async def update_product(product_id: str, product: ProductCreate):
    await db["products"].update_one({"_id": ObjectId(product_id)}, {"$set": product.dict(by_alias=True)})
    updated_product = await db["products"].find_one({"_id": ObjectId(product_id)})
    if updated_product:
        return ProductDB.from_mongo(**updated_product)
    raise HTTPException(status_code=404, detail="Product not found")


@app.delete("/products/{product_id}", status_code=204)
async def delete_product(product_id: str):
    delete_result = await db["products"].delete_one({"_id": ObjectId(product_id)})
    if delete_result.deleted_count == 1:
        return {"message": "Product deleted"}
    raise HTTPException(status_code=404, detail="Product not found")


@app.get("/predict_names/{product_name_piece}", response_model=ProductNamePredictions)
async def predict_product_name(product_name_piece: str):
    print(product_name_piece)
    if product_name_piece.endswith(' '):
        predictions = product_name_ngram.interactive_text_generation(product_name_piece)
        return ProductNamePredictions(names=predictions)

    if len(product_name_piece.split()) < 2:
        predictions = await name_auto_completer.get_candidates_from_t9(last_user_word=product_name_piece)

        if predictions is None:
            return ProductNamePredictions(names=[])

        return ProductNamePredictions(names=predictions)

    last_user_word = product_name_piece.split()[-1]

    predictions = await name_auto_completer.get_candidates_from_t9(last_user_word=last_user_word)
    names = [' '.join(product_name_piece.split()[:-1]) + ' ' + prediction for prediction in predictions]

    return ProductNamePredictions(names=names)


@app.get("/predict_categories/{product_name}", response_model=ProductInfo)
async def predict_category(product_name: str):
    indexes = categories.give_me_name(st=product_name, k=5)

    final_categories = []
    final_characteristics = []

    parsed_info = super_parser.get_product(name=product_name)
    for ind in indexes:
        res = cte_storage.get_product_by_id(product_id=int(ind))

        if parsed_info['features'] is not None:
            outp = [{"key": key, "value": value} for key, value in parsed_info['features'].items()]
            predicted_category = Category(
                model=res.model,
                category_name=res.name_category,
                manufacturer=res.manufacturer,
                characteristics=outp
            )
        else:
            res_dct = {}
            for str in characteristics_storage[res.name_category]:
                res_dct[str] = ''

            predicted_category = Category(
                model=res.model,
                category_name=res.name_category,
                manufacturer=res.manufacturer,
                characteristics=[res_dct]
            )
        final_categories.append(predicted_category)

    return ProductInfo(categories=final_categories, characteristics=final_characteristics)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
