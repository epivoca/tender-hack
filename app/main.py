from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import uvicorn


class Characteristic(BaseModel):
    name: str
    value: str
    unit: str


class ProductCreate(BaseModel):
    image: str
    product_type: str
    name: str
    model: str
    manufacturer: str
    measurement_unit: str
    gost_classification: str
    country_of_origin: str
    characteristics: List[Characteristic]


class ProductDB(ProductCreate):
    id: str = Field(None, alias="_id")

    @classmethod
    def from_mongo(cls, data: dict):
        data["id"] = str(data["_id"])
        del data["_id"]
        return cls(**data)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str  # для конвертации ObjectId в строку при сериализации JSON
        }


app = FastAPI()

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["product_database"]


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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
