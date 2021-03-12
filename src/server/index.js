const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const fetch = require("node-fetch");
const mockAPIResponse = require("./mockAPI.js");
const express = require("express");

// Start up an instance of app
const app = express();

const geoNameApiKey = process.env.GEONAMES_USERNAME;
const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;
const pixaBayApiKey = process.env.PIXABAY_API_KEY;
let travelData = { geoNameApiKey: geoNameApiKey, weatherBitApiKey: weatherBitApiKey, pixaBayApiKey: pixaBayApiKey };
let projectData = [];

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);
/*****
 * GetDataApi
 */

app.get("/getTravelData", (req, res) => {
    res.send(travelData);
});

app.get("/all", function (req, res) {
    console.log("get all ");
    console.log(projectData);
    res.send(projectData);
});

app.post("/addInfoCountry", addInfoCountry);

function addInfoCountry(req, res) {
    projectData = {
        imgCountry: req.body.imageLink,
        departureDay: req.body.departureDay,
        countryName: req.body.countryName,
        daysToTravel: req.body.daysCount,
        temp: req.body.temp,
        icon: req.body.icon,
        description: req.body.desc,
    };
    console.log("addInfoCountry", projectData);

    res.send(projectData);
}

app.get("/", function (req, res) {
    res.sendFile(path.resolve("src/client/views/index.html"));
});

//designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
    res.send(mockAPIResponse);
});
