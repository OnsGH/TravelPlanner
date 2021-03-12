
# Project overview

The Travel app is a  the final capstone project for Udacity's Front End Web Developer Nanodegree program. This project aims to give us the opportunity to put all of the skills that we learned into one project to build our own custom travel app.
<p align="center">
<img  width="300" height="350" src="screenshot.png">
</p>

# Project Instructions



The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls



## Getting started

`cd` into your new folder and run:
- `npm install`

## Setting up the API

### Step 1: Signup for an API key
First, you will need to go  Signing up will get you an API key.
- GeoNames
https://www.geonames.org/export/web-services.html

Example : http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo

- Weatherbit API
https://www.weatherbit.io/account/dashboard

API Documentation https://www.weatherbit.io/api

- Pixabay
API Documentation https://pixabay.com/api/docs/

### Step 2: Environment Variables
Next we need to create .env file and enter your own API credentials:

- GEONAMES_USERNAME = 
- WEATHERBIT_API_KEY = 
- PIXABAY_API_KEY =


### Step 3 : Using the API

We're ready to go! The API has a lot of different endpoints 
- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements. 
- Go back to the web pack config and add the setup for service workers. 
- Test that the site is now available even when you stop your local server
## Running the Application
- npm run build-prod
  -  npm start
- npm run test (For the test)

## Chosen Suggestions to Make My Project Stand Out
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Instead of just pulling a single day forecast, pull the forecast for multiple days.

