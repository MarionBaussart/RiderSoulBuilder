-- script that creates the table results containing the three best config


USE rider_soul_builder;

-- create tables
CREATE TABLE IF NOT EXISTS results (
character_name VARCHAR(30),
kart_name VARCHAR(30),
wheel_name VARCHAR(30),
glider_name VARCHAR(30),
speed REAL,
acceleration REAL,
weight REAL,
handling REAL,
grip REAL
);
