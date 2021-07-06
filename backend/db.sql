CREATE DATABASE checklistApp;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username SERIAL VARCHAR(50),
    password VARCHAR(255),
    group INT,
    admin BOOLEAN
);

CREATE TABLE checklists(
    id SERIAL PRIMARY KEY,
    author VARCHAR(50),
    group INT,
    todos VARCHAR()
)