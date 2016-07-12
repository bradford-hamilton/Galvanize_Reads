# Galvanize Reads

An app for keeping all your books in one place!

Link to live site  =>  placeHolder

## Installation for Development

* Set up a local postgres database called galvanize-reads (or whatever you'd like but don't forget to change db connection if you name it something else)
* `npm install knex -g`
* `npm install`
* `knex migrate:latest`
* `knex seed:run`
* `npm run dev-start`
* Go to port 3000 in your browser :)


### Deploy your own version to Heroku

* Set up a Heroku app for your project
* Set up a Heroku postgres database
* Create a `.env` file, use `.env.example` as a reference
* `knex migrate:latest --env production`
* `knex seed:run --env production`
