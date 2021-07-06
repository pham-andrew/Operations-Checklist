CREATE DATABASE checklistApp;

\c checklistApp

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username SERIAL VARCHAR(50),
    password VARCHAR(255),
    admin BOOLEAN
);

CREATE TABLE checklists(
    id SERIAL PRIMARY KEY,
    author VARCHAR(50),
    title VARCHAR(255),
    archived BOOLEAN
);

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    img BYTEA,
    order INT,
    completed BOOLEAN,
    todo VARCHAR(255)
);

-- JOIN TABLES
CREATE TABLE completed_lists(
    id SERIAL PRIMARY KEY,
    user_id INT,
    checklist_id INT,
    date_completed DATETIME
);

CREATE TABLE users_list(
    id SERIAL PRIMARY KEY,
    user_id INT,
    checklist_id INT,
    role VARCHAR(255)
);

CREATE TABLE todos_list(
    id SERIAL PRIMARY KEY,
    todos_id INT,
    checklist_id INT
);