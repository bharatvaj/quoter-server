create table quotes(id serial primary key,
                    quote text,
                    author text,
                    tags text[]);
insert into quotes(quote, author, tags) 
            values('Hippity Hoppity, women are property.',
                   'Dhipauk Joquim',
                   array ['romance', 'pedophilia']);
select * from quotes;
