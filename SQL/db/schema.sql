-- LEFT JOIN machine ON customers.machines_id = machine.id;

-- CREATE TABLE fork (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     brand VARCHAR(10) NOT NULL,
--     spring_rate INTEGER,
--     oil_weight INTEGER NOT NULL,
--     oil_height INTEGER NOT NULL
-- )

-- CREATE TABLE shock (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     brand VARCHAR(10) NOT NULL,
--     spring_rate INTEGER,
--     sag INTEGER
-- )

CREATE TABLE machine (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(30) NOT NULL,
    model VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL

);

CREATE TABLE customers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    machine_id INTEGER,
    CONSTRAINT fk_machine FOREIGN KEY (machine_id) REFERENCES machine(id) ON DELETE SET NULL 
);

      