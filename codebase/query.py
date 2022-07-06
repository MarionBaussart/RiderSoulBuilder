#!/usr/bin/python3
"""
Module contains the class definition of a the query client
"""
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Query(Base):
    """
    Class Query: inherits from Base.
    """
    __tablename__ = 'query'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    character_name = Column(String(30))
    kart_name = Column(String(30))
    wheel_name = Column(String(30))
    glider_name = Column(String(30))
    speed = Column(Float)
    acceleration = Column(Float)
    weight = Column(Float)
    handling = Column(Float)
    grip = Column(Float)
