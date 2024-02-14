CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE Streams (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_sequence INTEGER,
    segments INTEGER
);

INSERT INTO Streams (title, description, media_sequence, segments) VALUES ('El oso', 'En este stream se puede apreciar el camino del héroe del oso', 0, 0);