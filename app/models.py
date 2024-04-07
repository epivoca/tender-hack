from typing import List, Dict
from pydantic import BaseModel, Field
from bson import ObjectId


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


class ProductNamePredictions(BaseModel):
    names: List[str]


class Category(BaseModel):
    model: str
    category_name: str
    manufacturer: str
    characteristics: List[Dict[str, str]]


class ProductInfo(BaseModel):
    categories: List[Category]


class ProductDB(ProductCreate):
    id: str = Field(None, alias="_id")

    @classmethod
    def from_mongo(cls, data: dict):
        data["_id"] = str(data["_id"])
        return cls(**data)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str  # для конвертации ObjectId в строку при сериализации JSON
        }
