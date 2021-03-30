CREATE SCHEMA quoter;
CREATE TABLE quoter.quotes(id SERIAL PRIMARY KEY,
                    quote TEXT,
                    author TEXT,
                    tags TEXT[]);
INSERT INTO quoter.quotes(quote, author, tags) 
            VALUES('Hippity Hoppity, women are property.',
                   'Dhipauk Joquim',
                   ARRAY['romance', 'pedophilia']);
SELECT * FROM quoter.quotes;
