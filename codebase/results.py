#!/usr/bin/python3
"""
script that import data of table 'query' in database 'rider_soul_builder'
compare the datas with table 'configurations'
and create new table 'results' in database 'rider_soul_builder'
and fill it with the 3 best configurations of characters, karts, wheels
and gliders.
"""
import sys
# from sql.character import Base, Character
# from sql.kart import Base, Kart
# from sql.wheel import Base, Wheel
# from sql.glider import Base, Glider
from query import Base, Query

from sqlalchemy import create_engine, Table, Column, Integer, Float, String, MetaData
from sqlalchemy.orm import Session

if __name__ == "__main__":
    # usage: ./results.py root rider_soul_builder
    engine = create_engine('mysql+mysqldb://{}@localhost/{}'.format(
        sys.argv[1],
        sys.argv[2]),
        pool_pre_ping=True)

    Base.metadata.create_all(engine)

    session = Session(engine)

    # create table results
    meta = MetaData()

    configurations = Table (
        'results', meta,
        Column('id', Integer, primary_key=True, autoincrement=True, nullable=False),
        Column('character_name', String(30)),
        Column('kart_name', String(30)),
        Column('wheel_name', String(30)),
        Column('glider_name', String(30)),
        Column('speed', Float),
        Column('acceleration', Float),
        Column('weight', Float),
        Column('handling', Float),
        Column('grip', Float)
    )

    meta.create_all(engine)

    # import the characteristic wanted by the client in query table
    print(session.query(Query).all())
    #
    # for query in session.query(Query).all()

    # # fill the table with all possible configurations
    # for character in session.query(Character).all():
    #     for kart in session.query(Kart).all():
    #         for wheel in session.query(Wheel).all():
    #             for glider in session.query(Glider).all():
    #                 speed = character.speed + kart.speed + wheel.speed + glider.speed
    #                 acceleration = character.acceleration + kart.acceleration + wheel.acceleration + glider.acceleration
    #                 weight = character.weight + kart.weight + wheel.weight + glider.weight
    #                 handling = character.handling + kart.handling + wheel.handling + glider.handling
    #                 grip = character.grip + kart.grip + wheel.grip + glider.grip
    #                 query = "INSERT INTO configurations (speed, acceleration, weight, handling, grip, character_name, kart_name, wheel_name, glider_name) VALUES ({}, {}, {}, {}, {}, '{}', '{}', '{}', '{}')".format(speed, acceleration, weight, handling, grip, character.name, kart.name, wheel.name, glider.name)
    #                 engine.execute(query)

    session.close()
