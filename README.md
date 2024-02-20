# Wonder kanban

Wonder kanban is kanban board made for use with my other projects. Not only is it useful for managing work for the projects, but it also allows for sharing plans with my audience in a more coherent way. For reference, the previous way is a discord channel.

# Setting up an instace

I will consider setting up a makefile to make this process automatic to the point of copying files to a server.

## Backend
the backend is built with PHP and can be transferred to a server running php as is. Do however provide the php with credentials for the SQL server.

for the SQL server there is the wonder-kanban.sql file containing sql to create the necessary tables.

## Frontend
frontend scripting is done with TypeScript and must be compiled to JavaScript. this can be done using tsc.
styles are done with SCSS and must be compiled to css using the sass preprocessor.

the structure is html/php and can be copied over as is.

the compiled scripts and styles are expected to be in the "scripts" and "styles" folders respectively.
