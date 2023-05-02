<?php
require 'database.php';

// sql to create table
$sql = "DROP TABLE IF EXISTS users;";
$sql .= "DROP TABLE IF EXISTS items;";
$sql .= "DROP TABLE IF EXISTS cart;";
// $sql .= "DROP TABLE IF EXISTS reviews;";
$sql .= "DROP TABLE IF EXISTS trucks;";
$sql .= "DROP TABLE IF EXISTS trips;";
$sql .= "DROP TABLE IF EXISTS orders;";

$sql .= "CREATE TABLE IF NOT EXISTS users (
  user_id int PRIMARY KEY AUTO_INCREMENT,
  login_id varchar(255) NOT NULL,
  email varchar(128) NOT NULL,
  address varchar(255) DEFAULT '1 St George St, Toronto',
  card varchar(255) DEFAULT '',
  password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  balance decimal(10,2) DEFAULT NULL,
  admin int NOT NULL DEFAULT 0);";
$sql .= "CREATE TABLE IF NOT EXISTS items (
  id int PRIMARY KEY AUTO_INCREMENT,
  price INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  image_path VARCHAR(50));";
$sql .= "CREATE TABLE IF NOT EXISTS cart (
  id int PRIMARY KEY AUTO_INCREMENT,
  items varchar(255) NOT NULL,
  userid varchar(255) NOT NULL,
  orderid INT DEFAULT NULL);";
$sql .= "CREATE TABLE IF NOT EXISTS reviews (
  id int PRIMARY KEY AUTO_INCREMENT,
  review varchar(255) NOT NULL,
  userid varchar(255) NOT NULL);";
$sql .= "CREATE TABLE IF NOT EXISTS trucks (
  truckid INT PRIMARY KEY AUTO_INCREMENT,
  current_location VARCHAR(100));";
$sql .= "CREATE TABLE IF NOT EXISTS trips (
  routeid INT PRIMARY KEY AUTO_INCREMENT,
  truckid INT,
  start_location VARCHAR(255),
  end_location VARCHAR(255));";
$sql .= "CREATE TABLE IF NOT EXISTS orders (
  orderid INT PRIMARY KEY AUTO_INCREMENT,
  date_issued VARCHAR(255) NOT NULL,
  date_received VARCHAR(255) NOT NULL,
  total_price DECIMAL(11,2) NOT NULL,
  payment_code varchar(255) NOT NULL,
  delivery_type varchar(255) NOT NULL,
  userid VARCHAR(255),
  tripid VARCHAR(255));";
$sql .= "CREATE TABLE IF NOT EXISTS productReviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review INT,
  itemid VARCHAR(255) NOT NULL,
  userid varchar(255) NOT NULL);";

$sql .= "INSERT INTO items (price, name, image_path) VALUES (420, 'Manual Wheelchair', 'wheelchair.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (2750, 'Powered Wheelchair', 'power.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (350, 'Walker', 'walker.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (250, 'Commode With Wheels', 'commode.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (120, 'Commode Without Wheels', 'commode1.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (3253, 'Electric Scooter', 'scooter.jpg');";
$sql .= "INSERT INTO items (price, name, image_path) VALUES (2, 'Express Delivery', 'express.jpg');";
$sql .= "INSERT INTO trucks (current_location) VALUES ('mississauga');";
$sql .= "INSERT INTO trucks (current_location) VALUES ('toronto');";


if (!$mysqli->multi_query($sql)) {
  echo "Error creating table: " . mysqli_error($mysqli);
}
mysqli_close($mysqli);
