CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE Streams (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_sequence INTEGER,
    started_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    manifiest_url VARCHAR(255)
);
INSERT INTO Streams (id, title, description, media_sequence, manifiest_url)
        VALUES (1, 'El oso', 'En este stream se puede apreciar el camino del héroe del oso', 0,
        'http://localhost:8080/public/videos/segment.m3u8')