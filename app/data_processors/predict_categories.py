import string

from sqlalchemy import create_engine, Column, String, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import numpy as np
import string

import torch
import faiss

from sentence_transformers import SentenceTransformer

Base = declarative_base()


class Product(Base):
    __tablename__ = 'products'

    real_id = Column(BigInteger)
    id = Column(BigInteger, primary_key=True)
    name_cte = Column(String)
    name_category = Column(String)
    model = Column(String)
    manufacturer = Column(String)


class Database:
    def __init__(self):
        engine = self.get_pg_engine()
        Base.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        self.session = Session()

    def get_product_by_id(self, product_id):
        result = self.session.query(Product).filter(Product.real_id == product_id).one_or_none()
        print(result)
        return result

    @staticmethod
    def get_pg_engine(
            database_host: str = "127.0.0.1",
            database_port: str = "5400",
            database_user: str = "postgres",
            database_password: str = "postgres",
            database_name: str = "postgres",
    ):
        db_string = f"postgresql://{database_user}:{database_password}@{database_host}:{database_port}/{database_name}"

        return create_engine(db_string)


class EFB:
    def __init__(self, path_to_np: str):
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("loading SentenceTransformer")
        self.model = SentenceTransformer('./resources/LaBSE').to(device)
        print("loading numpy")
        data_array = np.load(path_to_np)  # np файл
        print("loaded numpy")

        self.index = faiss.IndexFlatL2(768)
        self.index.is_trained
        self.index.add(data_array)

    def give_me_name(self, st: str, k=1) -> int:
        pr_query = [self.preprocess_sentence(st)]
        xq = self.model.encode(pr_query)

        D, I = self.index.search(xq, k)  # можно менять
        I = np.squeeze(I)
        return I

    @staticmethod
    def preprocess_sentence(sentence):
        sentence = sentence.translate(str.maketrans('', '', string.punctuation)).lower()
        return sentence
