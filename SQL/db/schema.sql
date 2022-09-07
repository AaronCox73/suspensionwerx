CREATE TABLE manufacturer (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE customers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    make_id INTEGER,
    CONSTRAINT fk_make FOREIGN KEY (make_id) REFERENCES manufacturer(id) ON DELETE SET NULL 
);

