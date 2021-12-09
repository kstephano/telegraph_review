DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
    id serial PRIMARY KEY,
    path varchar (300) NOT NULL,
    title varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    archive_date varchar(100) NOT NULL,
    description varchar(1000) NOT NULL
);