# Wonder kanban

Wonder kanban is kanban board made for use with my other projects. Not only is it useful for managing work for the projects, but it also allows for sharing plans with my audience in a more coherent way. For reference, the previous way was to have a discord channel for each project.

The kanban boards can be publicly viewed at [kanban.thaumatized.com](https://kanban.thaumatized.com)

# Setting up an instance
## Server setup
First of all, the project is built with PHP and TypeScript, so a server running PHP is required. The project also uses a SQL server for data storage.

For the SQL server there is the `kanban.sql` file containing sql to create the necessary tables.

## Credentials
Change `backend/db-template.php` to `backend/db.php` and fill it with credentials.
Add temporary credentials to `backend/pass-template.php` to allow for administration. This is a temporary measure.

## Compiling
to compile the TypeScript and SCSS, the sass and typescript compilers are required. You will also need browserify to convert the compiled TypeScript to a file that can be run in the browser. Since the TypeScript compiler and browserify are npm packages, I recommend also getting sass from npm.
> npm install -g typescript browserify sass

here is a command to compile with:
> tsc; browserify js-build/scripts/index.js --s js -o build/scripts/index.js;  mkdir build/api -p; cp api/* build/api/; cp frontend-source/structure/* build/; sass frontend-source/styles/index.scss build/styles.css

then you can copy the contents of the build folder to the server. Here is the command I use for that:
> cp /drives/mass_storage/AAA_WIP/GIT/wonder-kanban/build/* . -r
