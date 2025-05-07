CREATE DATABASE IF NOT EXISTS LTW;
USE LTW;

CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE User (
    password VARCHAR(255) NOT NULL,
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    email VARCHAR(100) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    birth_day DATE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (account_id) REFERENCES Account(id)
);

CREATE TABLE Admin (
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(id)
);

CREATE TABLE Question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    create_at DATETIME,
    update_at DATETIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    create_at DATETIME,
    update_at DATETIME,
    question_id INT,
    user_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE

);

CREATE TABLE Contact_form (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Chưa xử lý',
    processed_at DATETIME NULL,
    content TEXT
);


CREATE TABLE News (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    created_at DATETIME,
    media_url VARCHAR(255)
);

CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating_point INT,
    content TEXT,
    created_at DATETIME,
    user_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    img_url VARCHAR(255)
);

CREATE TABLE Patch (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    exchange_amount INT,
    price DECIMAL(10,2),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_payment DECIMAL(10,2),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Patch_Order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50),
    created_at DATETIME,
    completed_at DATETIME,
    cart_id INT,
    FOREIGN KEY (cart_id) REFERENCES Cart(id)
);
