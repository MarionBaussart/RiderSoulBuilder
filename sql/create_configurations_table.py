#!/usr/bin/python3
"""
script that create new table 'configurations' in database 'rider_soul_builder'
and fill it with all the possibles configurations of characters, karts, wheels
and gliders.
"""
import sys
from character import Base, Character
from kart import Base, Kart
from wheel import Base, Wheel
from glider import Base, Glider

from sqlalchemy import create_engine, Table, Column, Integer, Float, String
from sqlalchemy import MetaData

from sqlalchemy.orm import Session

if __name__ == "__main__":
    # usage: ./create_configurations_table.py root rider_soul_builder
    engine = create_engine('mysql+mysqldb://{}@localhost/{}'.format(
        sys.argv[1],
        sys.argv[2]),
        pool_pre_ping=True)

    Base.metadata.create_all(engine)

    session = Session(engine)

    # create table configurations
    meta = MetaData()

    configurations = Table(
        'configurations', meta,
        Column('id', Integer, primary_key=True, autoincrement=True,
               nullable=False),
        Column('speed', Float),
        Column('acceleration', Float),
        Column('weight', Float),
        Column('handling', Float),
        Column('grip', Float),
        Column('character_name', String(30)),
        Column('kart_name', String(30)),
        Column('wheel_name', String(30)),
        Column('glider_name', String(30))
    )

    meta.create_all(engine)

    # fill the table with all possible configurations
    for character in session.query(Character).all():
        for kart in session.query(Kart).all():
            for wheel in session.query(Wheel).all():
                for glider in session.query(Glider).all():
                    speed = character.speed + kart.speed + wheel.speed + glider.speed
                    acceleration = character.acceleration + kart.acceleration + wheel.acceleration + glider.acceleration
                    weight = character.weight + kart.weight + wheel.weight + glider.weight
                    handling = character.handling + kart.handling + wheel.handling + glider.handling
                    grip = character.grip + kart.grip + wheel.grip + glider.grip
                    query = "INSERT INTO configurations (speed, acceleration, weight, handling, grip, character_name, kart_name, wheel_name, glider_name) VALUES ({}, {}, {}, {}, {}, '{}', '{}', '{}', '{}')".format(speed, acceleration, weight, handling, grip, character.name, kart.name, wheel.name, glider.name)
                    engine.execute(query)

    session.close()
