DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL DEFAULT 0
);