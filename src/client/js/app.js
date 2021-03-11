var moment = require("moment");

function getDestinationCoordinates(event) {
    event.preventDefault();

    let KeyApis = {};
    const inputDepDate = document.getElementById("input__date").value;
    const inputDestCountry = document.getElementById("input__dest").value;

    const today = new Date();
    var convertedToday = convertSystemDate(today);
    let isDepDateValid = checkDate(inputDepDate, convertedToday);

    if (Client.isEmptyInput(inputDestCountry) === false && Client.isNotValideDate(isDepDateValid) === false) {
        fetch("http://localhost:8081/getTravelData")
            .then((response) => response.json())
            .then((keyData) => {
                // keyData => console.log(keyData)
                KeyApis = keyData;
                console.log(keyData.geoNameApiKey);
                let geoUrl = `http://api.geonames.org/searchJSON?q=${inputDestCountry}&maxRows=1&username=${keyData.geoNameApiKey}`;

                getGeoInfo(geoUrl).then(function (responseData) {
                    console.log("responseData ", responseData);
                    /***
                     * UpdateUI
                     ***/
                    if (responseData.success === false) {
                        console.log("no success");
                        // Error
                    } else {
                        if (responseData.countryData.geonames.length == 0) {
                            // success but the country not listed ERROR VERIFY NAME
                            console.log(" success Length 0");
                        } else {
                            const countryName = responseData.countryData.geonames[0].name;
                            const countryCode = responseData.countryData.geonames[0].countryCode;
                            const countryLat = responseData.countryData.geonames[0].lat;
                            const countryLng = responseData.countryData.geonames[0].lng;
                            console.log(countryName, countryLat, countryLng);

                            getCountryDetails(countryCode, countryName, countryLng, countryLat, inputDepDate, keyData.weatherBitApiKey, keyData.pixaBayApiKey);
                        }
                    }
                });
            });
    }
}

function checkDate(inputDate, today) {
    console.log("Sys " + today);
    console.log("Input " + inputDate);

    var momenttoday = moment(today, "YYYY/MM/DD");
    var momentinputDep = moment(inputDate, "YYYY/MM/DD");

    var d = momentinputDep.diff(momenttoday, "days");
    console.log("Days ago ", d);

    if (momenttoday > momentinputDep) return 1;
    else if (momenttoday < momentinputDep) return -1;
    else return 0;
}

function convertSystemDate(systemDate) {
    let month = systemDate.getMonth() + 1;
    let day = "" + systemDate.getDate();
    let year = systemDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

const getGeoInfo = async (geoNameUrl) => {
    try {
        const response = await fetch(geoNameUrl);
        let responseData = {};
        if (response.status === 200) {
            responseData = { success: true, countryData: await response.json() };
            return responseData;
        } else {
            responseData = { success: false, error: response.statusText };
            return responseData;
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: console.error.message };
    }
};

export function getNumberOfDays(inputDepDate) {
    const today = new Date();
    var momenttoday = moment(today, "YYYY/MM/DD");
    var momentinputDep = moment(inputDepDate, "YYYY/MM/DD");
    var days = momentinputDep.diff(momenttoday, "days");

    return days;
}

const getCountryDetails = async (countryCode, countryName, countryLng, countryLat, inputDepDate, weatherBitApiKey, pixaBayApiKey) => {
    var daysToTravel = getNumberOfDays(inputDepDate);
    let currentWeatherBitUrl = `https://api.weatherbit.io/v2.0/current?lat=${countryLat}&lon=${countryLng}&key=${weatherBitApiKey}&include=minutely`;
    let forecastWeatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${countryLat}&lon=${countryLng}&key=${weatherBitApiKey}`;
    let imgCountryUrl = `https://pixabay.com/api/?key=${pixaBayApiKey}&q=${countryName}&orientation=horizontal&category=buildings&per_page=3`;
    let temp = ``;
    let icon = ``;
    let weather__icon__lnk = ``;
    let desc = ``;
    getCountryImg(imgCountryUrl)
        .then(function (responseData) {
            console.log(responseData);
            if (responseData.success === false) {
                console.log("no success");
            } else {
                let imgLink = "";
                if (responseData.imgData.hits.length == 0) {
                    console.log(imgLink);
                    imgLink = "./src/client/media/plane-1.jpg";
                } else {
                    imgLink = responseData.imgData.hits[0].webformatURL;
                }
                Client.UpdateUIImage(imgLink, countryName);
            }
        })
        .then(function (weatherData) {
            if (daysToTravel < 7) {
                getCurrentWeatherInfo(currentWeatherBitUrl).then(function (responseCurrentWeatherData) {
                    console.log("responseCurrentWeatherData ", responseCurrentWeatherData);

                    if (responseCurrentWeatherData.success === false) {
                        console.log("no success");

                        // updateUINoSuccess();
                    } else {
                        console.log("success");
                        temp = responseCurrentWeatherData.currentWeatherData.data[0].temp;
                        icon = responseCurrentWeatherData.currentWeatherData.data[0].weather.icon;
                        console.log("Icon ", icon);
                        weather__icon__lnk = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                        desc = responseCurrentWeatherData.currentWeatherData.data[0].weather.description;
                        Client.UpdateBodyInformation(inputDepDate, countryName, daysToTravel, temp, weather__icon__lnk, desc);
                        localStorage.setItem("departureDay", inputDepDate);
                        localStorage.setItem("countryName", countryName);
                        localStorage.setItem("daysToTravel", daysToTravel);
                        localStorage.setItem("temp", temp);
                        localStorage.setItem("icon", weather__icon__lnk);
                        localStorage.setItem("description", desc);
                    }
                });
            } else if (daysToTravel >= 7 && daysToTravel < 16) {
                getForecastWeatherInfo(forecastWeatherBitUrl).then(function (responseForecastWeatherData) {
                    console.log("responseForecastWeatherData ", responseForecastWeatherData);

                    if (responseForecastWeatherData.success === false) {
                        console.log("no success");
                    } else {
                        temp = responseForecastWeatherData.forecastWeatherData.data[daysToTravel].temp;
                        icon = responseForecastWeatherData.forecastWeatherData.data[daysToTravel].weather.icon;
                        desc = responseForecastWeatherData.forecastWeatherData.data[daysToTravel].weather.description;
                        weather__icon__lnk = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                        if (daysToTravel > 13) Client.UpdateBodyInformation(inputDepDate, countryName, daysToTravel, temp, weather__icon__lnk, desc);
                        else {
                            var tempJsonArr = [];

                            for (var i = 0; i < 3; i++) {
                                const date = moment(responseForecastWeatherData.forecastWeatherData.data[i + daysToTravel].datetime); // Thursday Feb 2015
                                const dayName = moment(date).format("ddd");
                                const icon = responseForecastWeatherData.forecastWeatherData.data[i + daysToTravel].weather.icon;
                                tempJsonArr.push({
                                    dayName: dayName,
                                    temp: responseForecastWeatherData.forecastWeatherData.data[i + daysToTravel].temp,
                                    icon: `https://www.weatherbit.io/static/img/icons/${icon}.png`,
                                });
                            }
                            Client.UpdateBodyInformation(inputDepDate, countryName, daysToTravel, temp, weather__icon__lnk, desc);
                            Client.displayForecastformation(tempJsonArr, daysToTravel);
                            console.log(tempJsonArr);
                        }
                    }
                });
            } else {
                temp = "N/A";
                weather__icon__lnk = `./src/client/media/na.svg`;
                console.log("Icon ", icon);
                desc = "The weather forecat data is not available ";
                Client.UpdateBodyInformation(inputDepDate, countryName, daysToTravel, temp, weather__icon__lnk, desc);
            }
        });
};

const getCountryImg = async (imgCountryUrl) => {
    try {
        const response = await fetch(imgCountryUrl);
        let responseData = {};

        if (response.status === 200) {
            responseData = { success: true, imgData: await response.json() };
            return responseData;
        } else {
            responseData = { success: false, error: response.statusText };
            return responseData;
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: console.error.message };
    }
};

const getForecastWeatherInfo = async (forecastWeatherBitUrl) => {
    try {
        const response = await fetch(forecastWeatherBitUrl);
        let responseData = {};
        if (response.status === 200) {
            responseData = { success: true, forecastWeatherData: await response.json() };
            return responseData;
        } else {
            responseData = { success: false, error: response.statusText };
            return responseData;
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: console.error.message };
    }
};

const getCurrentWeatherInfo = async (currentWeatherBitUrl) => {
    try {
        const response = await fetch(currentWeatherBitUrl);
        let responseData = {};
        if (response.status === 200) {
            responseData = { success: true, currentWeatherData: await response.json() };
            return responseData;
        } else {
            responseData = { success: false, error: response.statusText };
            return responseData;
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: console.error.message };
    }
};

export { getDestinationCoordinates };
