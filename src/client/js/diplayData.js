/**
 *  Test is the destination input is empty or not
 */
function isEmptyInput(input) {
  const msg = document.getElementById("msg");
  if (input === "") {
      msg.textContent = "Please enter your destination 😩";
      return true;
  } else {
      msg.textContent = "";
      return false;
  }
}

/**
 *  Test is the destination name is correct or not
 */
function displayErrorCountryName(input) {
  const msg = document.getElementById("msg");
  msg.textContent = `${input} is invalid, please enter a valid country name 😩`;
}
/**
 *  Test is the user entred a valid departure day
 *  date entred should be >= System Date
 */

function isNotValideDate(isValid) {
  const msg = document.getElementById("msg");

  if (isValid === 1) {
      msg.textContent = "Please enter a valid departure date 😩";
      return true;
  } else if (isValid === -1 || isValid === 0) return false;
}

/**
 *  Display image country
 */
function UpdateUIImage(imageLink, countryName, departureDay) {
  const countryImage = document.getElementById("country__image");
  const countryFigureCaption = document.getElementById("country__figurecaption");
  countryImage.src = imageLink;
  const markup__countryName = `
<h3>${countryName}</h3>`;
  countryFigureCaption.innerHTML = markup__countryName;
}

/**
 *  Display destination information 
 **** weather
 ****  Number of days to travel 
 *  Post data to the server ==> To display it if the user click on the SAVE button
 */

function UpdateBodyInformation(imageLink, departureDay, countryName, daysCount, temp, icon, desc) {
  const departure__day = document.getElementById("departure__day");
  const days__count = document.getElementById("days__count");
  const country__temperature = document.getElementById("country__temperature");
  const sup = document.getElementById("sup");
  const weather__icon = document.getElementById("wather__img");
  const weather__description = document.getElementById("weather__description");

  document.getElementById("weather__title").hidden = false;
  document.getElementById("temp__table").hidden = true;
  document.getElementById("btn").style.display = "inline-block";

  const markup__departureDay = `<h3> Departure Day is <span  style="color:red"> ${departureDay} </span>  <h3>`;
  departure__day.innerHTML = markup__departureDay;

  const markup__daysCount = ` Your trip is   <span  style="color:red"> ${daysCount} </span>  days away `;
  days__count.innerHTML = markup__daysCount;

  const markup__temp = `
<span id="temperature">${Math.round(temp)}
<sup id="sup">°C</sup>
 </span>
       `;
  country__temperature.innerHTML = markup__temp;
  const markup__temp__icon = `
  <figure>
   <img id="weather__icon" src= ${icon}  alt="">
  </figure> `;
  weather__icon.innerHTML = markup__temp__icon;
  weather__description.innerHTML = desc;

  postData("/addInfoCountry", {
      imageLink,
      departureDay,
      countryName,
      daysCount,
      temp,
      icon,
      desc,
  });

  let saveTrip = document.getElementById("btn");
}

/**
 *  Display Forecast weather information of the choosen destination  
 ****  Display three days forecast
 */

function displayForecastformation(tempJsonArr, countDays) {
  const weather__prediction = document.getElementById("temp__table");
  document.getElementById("temp__prediction__title").hidden = false;
  if (countDays > 13) {
      document.getElementById("temp__table").hidden = true;
  } else {
      document.getElementById("temp__table").hidden = false;
  }

  const markup__temp = `
 
  <tr>
      <td>${tempJsonArr[0].dayName}</td>
      <td>${tempJsonArr[1].dayName}</td>
      <td>${tempJsonArr[2].dayName}</td>
      
  </tr>
  <tr>
      <td><img src="${tempJsonArr[0].icon}"> </td>
      <td><img src="${tempJsonArr[1].icon}"></td>
      <td><img src="${tempJsonArr[2].icon}"></td>
      
  </tr>
  <tr>
      <td>${Math.round(tempJsonArr[0].temp)}°</td>
      <td>${Math.round(tempJsonArr[1].temp)}°</td>
      <td>${Math.round(tempJsonArr[2].temp)}°</td>
      
  </tr>

`;
  weather__prediction.innerHTML = markup__temp;
}

const postData = async (url = "", data = {}) => {
  console.log("postData ", data);
  console.log(url);
  const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
  });

  try {
      const newData = await response.json();

      console.log(newData);
      return newData;
  } catch (error) {
      console.log("error", error);
  }
};

/**
 *  Display destination information from the server 
 *  when the user click on save button
 **/

const saveUI = async (event) => {
  event.preventDefault();
  const request = await fetch("/all");

  try {
      const allData = await request.json();
      console.log("updateUI allData", allData);

      const savedCard = document.querySelector("section.main__grid");

      const div = document.createElement("div");
      div.classList.add("card");
      const markup = `
<div class='card__item'>
<div class="img">
<figure>
<img class="country__img" src=${allData.imgCountry} alt="">
</figure>
</div>
<div class="city__name">
 <span>${allData.countryName}</span>
 </div>
<div class="date">
<span>${allData.departureDay}</span>
</div>
<div class="city__temp">
<span>${Math.round(allData.temp)}
<sup>°C</sup>
</span>
</div>
<figure>
<img class="weather__icon" src=${allData.icon} alt="">
<figcaption>${allData.description}</figcaption>
</figure>

</div>
        
</div>
   

`;
      div.innerHTML = markup;
      savedCard.appendChild(div);
  } catch (error) {
      console.log("error", error);
  }
};

export { isEmptyInput, isNotValideDate, UpdateUIImage, UpdateBodyInformation, displayForecastformation, saveUI, displayErrorCountryName };
