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

function isNotValideDate(isValid) {
  const msg = document.getElementById("msg");

  if (isValid === 1) {
      msg.textContent = "Please enter a valid departure date 😩";
      return true;
  } else if (isValid === -1 || isValid === 0) return false;
}

function UpdateUIImage(imageLink, countryName) {
  const countryImage = document.getElementById("country__image");
  const countryFigureCaption = document.getElementById("country__figurecaption");
  countryImage.src = imageLink;
  const markup__countryName = `
<h3>${countryName}</h3>`;
  countryFigureCaption.innerHTML = markup__countryName;
}

function UpdateBodyInformation(departureDay, countryName, daysCount, temp, icon, desc) {
  const days__count = document.getElementById("days__count");
  const country__temperature = document.getElementById("country__temperature");
  const sup = document.getElementById("sup");
  const weather__icon = document.getElementById("wather__img");
  const weather__description = document.getElementById("weather__description");

  //const weather__icon__lnk = `https://www.weatherbit.io/static/img/icons/${icon}.png` ;
  document.getElementById("weather__title").hidden = false;
  document.getElementById("temp__table").hidden = true;
  document.getElementById("btn").style.display = "inline-block";
  const markup__daysCount = ` Your trip is  <span  style="color:red"> ${daysCount} </span> days away `;

  days__count.innerHTML = markup__daysCount;

  const markup__temp = `
<span id="temperature">${Math.round(temp)}
 <sup id="sup">°C</sup>
 </span>
         `;
  country__temperature.innerHTML = markup__temp;
  // document.getElementById("").appendChild(div);
  const markup__temp__icon = `
    <figure>
     <img id="weather__icon" src= ${icon}  alt="">
    </figure> `;
  weather__icon.innerHTML = markup__temp__icon;
  weather__description.innerHTML = desc;

  let saveTrip = document.getElementById("btn");
  /* saveTrip.addEventListener(
       'click',  function () { 
       // e.preventDefault();
           postData('/addInfoCountry', {
           departureDay,
           countryName,
           daysCount,
           temp,
           icon,
           desc,
           
       });
       //saveUI();
     })*/
  // saveTrip.onclick = saveTripInfo;
}

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

const saveUI = async () => {
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
  <img class="country__img" src="./src/client/media/plane-1.jpg" alt="">
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

export { isEmptyInput, isNotValideDate, UpdateUIImage, UpdateBodyInformation, displayForecastformation };
