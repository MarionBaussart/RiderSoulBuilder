-- script that creates the database rider_soul_builder in a MySQL server

-- create database
CREATE DATABASE IF NOT EXISTS rider_soul_builder;
USE rider_soul_builder;

-- create tables
CREATE TABLE IF NOT EXISTS characters (
id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
name VARCHAR(30),
speed REAL,
acceleration REAL,
weight REAL,
handling REAL,
grip REAL
);

CREATE TABLE IF NOT EXISTS karts (
    id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    speed REAL,
    acceleration REAL,
    weight REAL,
    handling REAL,
    grip REAL
);

CREATE TABLE IF NOT EXISTS wheels (
    id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    speed REAL,
    acceleration REAL,
    weight REAL,
    handling REAL,
    grip REAL
);

CREATE TABLE IF NOT EXISTS gliders (
    id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    speed REAL,
    acceleration REAL,
    weight REAL,
    handling REAL,
    grip REAL
);

-- fill the characters table (data source: https://mk8dxbuilder.com/)
INSERT INTO characters (name, speed, acceleration, weight, handling, grip) VALUES
    ("Mario", 3.75, 3.5, 3.5, 3.5, 3.5),
    ("Luigi", 3.75, 3.5, 3.5, 3.75, 3.25),
    ("Peach", 3.5, 3.75, 3, 3.75, 3.75),
    ("Daisy", 3.5, 3.75, 3, 3.75, 3.75),
    ("Rosalina", 4, 3.25, 3.75, 3.25, 3.75),
    ("Tanooki Mario", 3.5, 3.75, 3.25, 3.75, 3.25),
    ("Cat Peach", 3.25, 4, 2.75, 4, 3.75),
    ("Yoshi", 3.5, 3.75, 3, 3.75, 3.75),
    ("Toad", 3, 4, 2.75, 4.25, 4),
    ("Koopa Troopa", 2.75, 4, 2.5, 4.5, 4.25),
    ("Maskass", 3, 4, 2.75, 4.25, 4),
    ("Lakitu", 2.75, 4, 2.5, 4.5, 4.25),
    ("Toadette", 2.75, 4.25, 2.5, 4.25, 3.5),
    ("King Boo", 4, 3.25, 3.75, 3.25, 3.75),
    ("Baby Mario", 2.5, 4.25, 2.25, 4.5, 4),
    ("Baby Luigi", 2.5, 4.25, 2.25, 4.5, 4),
    ("Baby Peach", 2.25, 4, 2, 5, 4.25),
    ("Baby Daisy", 2.25, 4, 2, 5, 4.25),
    ("Baby Harmonie", 2.25, 4.25, 2, 4.75, 3.75),
    ("Metal Mario", 4.25, 3.25, 4.5, 3.25, 3.25),
    ("Pink Gold Peach", 4.25, 3.25, 4.5, 3.25, 3.25),
    ("Wario", 4.75, 3, 4.25, 2.75, 3.25),
    ("Waluigi", 4.5, 3.25, 4, 3, 3),
    ("Donkey Kong", 4.5, 3.25, 4, 3, 3),
    ("Bowser", 4.75, 3, 4.5, 2.5, 3),
    ("Dry Bones", 2.5, 4.25, 2.25, 4.5, 4),
    ("Bowser Jr", 2.75, 4, 2.5, 4.5, 4.25),
    ("Dry Bowser", 4.75, 3, 4.25, 2.75, 3.25),
    ("Lemmy", 2.25, 4.25, 2, 4.75, 3.75),
    ("Larry", 3, 4, 2.75, 4.25, 4),
    ("Wendy", 2.75, 4.25, 2.5, 4.25, 3.5),
    ("Ludwig", 3.75, 3.5, 3.5, 3.5, 3.5),
    ("Iggy", 3.75, 3.5, 3.5, 3.75, 3.25),
    ("Roy", 4.5, 3.25, 4, 3, 3),
    ("Morton", 4.75, 3, 4.5, 2.5, 3),
    ("Inkling Girl", 3.25, 4, 2.75, 4, 3.75),
    ("Inkling Boy", 3.5, 3.75, 3.25, 3.75, 3.25),
    ("Link", 4, 3.25, 3.75, 3.25, 3.75),
    ("Villager male", 3.5, 3.75, 3.25, 3.75, 3.25),
    ("Villager female", 3.25, 4, 2.75, 4, 3.75),
    ("Isabelle", 2.75, 4.25, 2.5, 4.25, 3.5);

-- fill the karts table (data source: https://tivac.github.io/mk8d-builder/#!/kart)
INSERT INTO karts (name, speed, acceleration, weight, handling, grip) VALUES
    ("Standard Kart", 0, 0, 0, 0, 0),
    ("Pipe Frame", -0.5, 0.5, -0.25, 0.5, 0.25),
    ("Mach 8", 0, -0.25, 0.25, -0.25, 0.25),
    ("Steel Driver", 0.25, -0.75, 0.5, -0.5, 0),
    ("Cat Cruiser", -0.25, 0.25, 0, 0.25, 0),
    ("Circuit Special", 0.5, -0.75, 0.25, -0.5, -0.5),
    ("Tri-Speeder", 0.25, -0.75, 0.5, -0.5, 0),
    ("Badwagon", 0.5, -1, 0.5, -0.75, 0.5),
    ("Prancer", 0.25, -0.5, -0.25, 0, -0.25),
    ("Biddybuggy", -0.75, 0.75, -0.5, 0.5, 0.5),
    ("Landship", -0.5, 0.5, -0.5, -0.5, 0.75),
    ("Sneeker", 0.25, -0.5, 0, 0, -0.75),
    ("Sports Coupe", 0, -0.25, 0.25, -0.25, 0.25),
    ("Gold Standard", 0.25, -0.5, 0, 0, -0.75),
    ("Mercedes GLA", 0.5, -1, 0.5, -0.75, 0.5),
    ("Mercedes Silver Arrow", -0.25, 0.25, -0.25, 0.25, 0.5),
    ("Mercedes 300 SL Roadster", 0, 0, 0, 0, 0),
    ("Blue Falcon", 0.25, -0.25, -0.5, -0.25, 0.5),
    ("Tanooki Kart", -0.25, -0.5, 0.25, 0.25, 0),
    ("B Dasher", 0.5, -0.75, 0.25, -0.5, -0.25),
    ("Streetle", -0.5, 0.5, -0.5, -0.5, -0.25),
    ("P-Wing", 0.5, -0.75, 0.25, -0.5, -0.25),
    ("Koopa Clown", -0.25, -0.5, 0.25, 0.25, 0),
    ("Standard Bike", 0, 0, 0, 0, 0),
    ("Comet", -0.25, 0.25, 0, 0.25, 0),
    ("Sport Bike", 0.25, -0.5, -0.25, 0, -0.25),
    ("The Duke", 0, 0, 0, 0, 0),
    ("Flame Rider", -0.25, 0.25, -0.25, 0.25, 0.5),
    ("Varmint", -0.5, 0.5, -0.25, 0.5, 0.25),
    ("Mr. Scooty", -0.75, 0.75, -0.5, 0.5, 0.25),
    ("Jet Bike", 0.25, -0.5, -0.25, 0, -0.25),
    ("Yoshi Bike", -0.25, 0.25, 0, 0.25, 0),
    ("Master Cycle", 0.25, -0.5, 0, 0, -0.75),
    ("Master Cycle Zero", -0.25, -0.5, 0.25, 0.25, 1),
    ("City Tripper", -0.5, 0.5, -0.25, 0.5, 0.25),
    ("Standard ATV", 0.5, -1, 0.5, -0.75, 0.5),
    ("Wild Wiggler", -0.25, 0.25, -0.25, 0.25, 0.5),
    ("Teddy Buggy", -0.25, 0.25, 0, 0.25, 0),
    ("Bone Rattler", 0.25, -0.75, 0.5, -0.5, 0),
    ("Splat Buggy", 0.25, -0.25, -0.5, -0.25, 0),
    ("Inkstriker", 0, -0.25, 0.25, -0.25, 0.25);

-- fill the wheels table (data source: https://tivac.github.io/mk8d-builder/#!/tire)
INSERT INTO wheels (name, speed, acceleration, weight, handling, grip) VALUES
    ("Standard", 0, 0, 0, 0, 0),
    ("Monster", 0, -0.5, 0.5, -0.75, 0.5),
    ("Roller", -0.5, 0.5, -0.5, 0.25, -0.25),
    ("Slim", 0.25, -0.5, 0, 0.25, -1),
    ("Slick", 0.5, -0.75, 0.25, -0.25, -1.25),
    ("Metal", 0.5, -1, 0.5, -0.25, -0.75),
    ("Button", -0.25, 0.25, -0.5, 0, -0.5),
    ("Off-Road", 0.25, -0.25, 0.25, -0.5, 0.25),
    ("Sponge", -0.25, 0, -0.25, -0.25, 0.25),
    ("Wood", 0.25, -0.5, 0, 0.25, -1),
    ("Cushion", -0.25, 0, -0.25, -0.25, 0.25),
    ("Blue Standard", 0, 0, 0, 0, 0),
    ("Hot Monster", 0, -0.5, 0.5, -0.75, 0.5),
    ("Azure Roller", -0.5, 0.5, -0.5, 0.25, -0.25),
    ("Crimson Slim", 0.25, -0.5, 0, 0.25, -1),
    ("Cyber Slick", 0.5, -0.75, 0.25, -0.25, -1.25),
    ("Retro Off-Road", 0.25, -0.25, 0.25, -0.5, 0.25),
    ("Gold", 0.5, -1, 0.5, -0.25, -0.75),
    ("GLA", 0, 0, 0, 0, 0),
    ("Triforce", 0.25, -0.25, 0.25, -0.5, 0.25),
    ("Ancient Tires", 0, -0.5, 0.5, -0.75, 0.5),
    ("Leaf", -0.25, 0.25, -0.5, 0, -0.5);

-- fill the gliders table (data source: https://tivac.github.io/mk8d-builder/#!/glider)
INSERT INTO gliders (name, speed, acceleration, weight, handling, grip) VALUES
    ("Super Glider", 0, 0, 0, 0, 0),
    ("Cloud Glider", -0.2, 0.25, -0.25, 0, 0),
    ("Wario Wing", 0, 0, 0.25, 0, -0.25),
    ("Waddle Wing", 0, 0, 0, 0, 0),
    ("Peach Parasol", -0.25, 0.25, -0.25, 0, 0),
    ("Parachute", -0.25, 0.25, -0.25, 0, 0),
    ("Parafoil", -0.25, 0.25, 0, 0, -0.25),
    ("Flower Glider", -0.25, 0.25, -0.25, 0, 0),
    ("Bowser Kite", -0.25, 0.25, 0, 0, -0.25),
    ("Plane Glider", 0, 0, 0.25, 0, -0.25),
    ("MKTV Parafoil", -0.25, 0.25, 0, 0, -0.25),
    ("Gold Glider", 0, 0, 0.25, 0, -0.25),
    ("Hylian Kite", 0, 0, 0, 0, 0),
    ("Paraglider", 0, 0, 0.25, 0, -0.25),
    ("Paper Glider", -0.25, 0.25, -0.25, 0, 0);
