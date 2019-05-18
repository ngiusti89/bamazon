DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  dapartment_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(100),
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("Baseball Hats", "Apparel", 9.99, 20),
("Bose Headphones", "Electronics", 250.00, 5),
("Tie-Dye Shirts", "Apparel", 6.99, 10),
("USB Hub", "Electronics", 49.99, 20),
("Retractable Dog Leash", "Pets", 12.99, 15),
("Tennis Balls", "Sports", 3.99, 12),
("Womens Lacrosse Stick", "Sports", 200.00, 5),
("Office Chair", "Home", 150, 2),
("Dove Shampoo", "Cosmetics", 8.50, 10),
("XBox One", "Electronics", 299.99, 5);

SELECT * FROM products