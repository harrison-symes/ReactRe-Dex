[live version](https://pokemeowtown.herokuapp.com)

# A starter webpack project for React, Redux, Express and Knex

This is a rad base for starting a new full-stack project, or just as reference for how to do things the Harrison way (which is with absolutely no test folder, I'll leave that one to Alan)

* Fork this repo to your github
* Rename your repo according to the app you're building
* Clone your forked repo down
* Run the following commands in your terminal

```sh
npm install
knex migrate:latest
knex seed:run

```

  `npm run dev` for bundling, watch and nodemon

  `npm start` only runs server (setup for heroku)


# Heroku!!!

#### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


#### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

`npm run h:deploy` will push your local master branch to your heroku app

`npm run h:migrate` will run your knex migrations on your deployed heroku app

`npm run h:seed` will run your seeds on your deployed app

If ever you need to rollback, you can also just use `npm run h:rollback`


## Ta-Da!
Your app should be deployed!

I can add some exercises/comments to this repo if there is desire for such, but for now, hopefully this proves useful :)
