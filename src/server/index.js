const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const fetch = require("node-fetch");
const mockAPIResponse = require("./mockAPI.js");
const express = require("express");

// Start up an instance of app
const app = express();

const apiKey = process.env.API_KEY;
let projectData = [];

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
    res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/sentimentAnalysisApi", async function (req, res) {
    projectData = req.body.textToAnalyse;
    console.log(projectData);
    const ApiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${projectData}`;

    const response = await fetch(ApiUrl);
    const sentimentAnalysisData = await response.json();
    console.log(sentimentAnalysisData);
    res.send(sentimentAnalysisData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
    res.send(mockAPIResponse);
});
