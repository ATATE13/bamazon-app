DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
   item_id INTEGER AUTO_INCREMENT  NOT NULL,
   product_name VARCHAR (50) NOT NULL,
   department_name VARCHAR(50) NOT NULL,
   price DECIMAL (10,4) NOT NULL,
   stock_quantity INTEGER (10) NOT NULL,
   primary key (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Nintendo Switch", "Electronics", 200, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Principles: Life and Work", "Books", 20, 2000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Echo Dot", "Electronics", 70, 500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Fog Machine", "Party", 45, 8000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Kindle", "Electronics", 75, 10000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "The X Cube", "Toys", 15, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Vintage Mozart Records", "Music", 300, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "GPS Drone", "Electronics", 150, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Gaming Mouse Pad", "Electronics", 25, 2500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Panasonic Cordless Iron", "Home", 35, 5000);

SELECT * FROM bamazon.products;