CREATE DATABASE perntodo; 

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR (250) 
)

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY , 
    name VARCHAR(100), 
    color VARCHAR(100)
);

DELETE  FROM categories 
WHERE category_id = 1;

INSERT INTO categories 
VALUES (2, 'sports', 'blue');


INSERT INTO todo 
VALUES ( 'dance', true);


ALTER TABLE categories
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);

ALTER TABLE todo 
ADD COLUMN todo_id SERIAL PRIMARY KEY ;

ALTER TABLE todo
ADD COLUMN name VARCHAR(250)

ALTER TABLE todo
ADD COLUMN completed BOOLEAN;

ALTER TABLE todo  
DROP COLUMN category_id;


 ALTER TABLE todo 
 ADD COLUMN category_id integer;

ALTER TABLE todo ADD CONSTRAINT distfk FOREIGN KEY (category_id) REFERENCES categories (category_id);

