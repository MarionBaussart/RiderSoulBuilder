#!/usr/bin/python3
"""
Module contains the class definition of a Character
"""
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Character(Base):
    """
    Class Character: inherits from Base.
    """
    __tablename__ = 'characters'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(String(30), nullable=False)
    speed = Column(Float)
    acceleration = Column(Float)
    weight = Column(Float)
    handling = Column(Float)
    grip = Column(Float)
