// event input search
let search = document.getElementById("search_link");
let input_Search = document.getElementById("input_search");
search.addEventListener("click", () => {
  if (input_Search.style.display === "none") {
    input_Search.style.display = "block";
  } else {
    input_Search.style.display = "none";
  }
});

// event broghtness and dark mode
let btn_brightness = document.getElementById("brightness_icon");
let img_dark = document.getElementById("img_dark");
// select body
let bd = document.getElementById("body");
// select img search for change
let img_search = document.getElementById("search_white");
// select img search for change
let img_location = document.getElementById("img_location");
// event:-->
btn_brightness.addEventListener("click", () => {
  if (img_dark.src.includes("Sun.svg")) {
    img_dark.src = "img/Moon.svg";
    img_search.src = "img/search_white.svg";
    img_location.src = "img/location_white.svg";
    bd.style.color = "white";
    bd.style.backgroundColor = "white";
  } else {
    img_dark.src = "img/Sun.svg";
    img_search.src = "img/search_black.svg";
    img_location.src = "img/location_black.svg";
    bd.style.color = "black";
    bd.style.backgroundColor = "black";
  }
});

// DATE
// const city = document.getElementById("input_search");
const apikey = "3d57b696db2bbf1337326cdf28fd0fd5";
let days = [];
const today = new Date();

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const fdate = `${year}-${month}-${day}`;
  return fdate;
}
for (let i = 0; i < 5; i++) {
  today.setDate(today.getDate() + 1);
  days.push(formatDate(today));
}
input_Search.addEventListener("change", function () {
  console.log(days);
});

// api
let latitude;
let longitude;
let location;
let weather;
// let city = input_Search.value;
let metric = "units=metric";
const api_key = "3d57b696db2bbf1337326cdf28fd0fd5";

let fetchData = async function (url) {
  try {
    console.log(url);
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
    // if (tpe === true) {
    //   location = data.city.name + "," + data.city.country;
    //   let cityName = document.getElementById("location");
    //   cityName.innerHTML = `<h1>${location}</h1>`;
    // } else {
    //   console.log(data);
    //   location = data.name + "," + data.sys.country;
    //   let cityName = document.getElementById("location");
    //   cityName.innerHTML = `<h1>${location}</h1>`;
    //   // let weather_today = document.getElementById("weather_today");
    //   // weather = data.main.temp;
    //   // weather_today.innerHTML = `<h1>${weather}°C</h1>`;
    // }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// five value in box temperature...

window.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const geoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&${metric}`;
        // fetchData
        fetchData(`${geoUrl}`)
          .then((result) => {
            console.log(result);
            console.log(result.city.name);
            const city = result.city.name;
            //weather icon
            let weather_icon = document.getElementById("weather_icon");
            weather_icon.src =
              "https://openweathermap.org/img/wn/" +
              result.list[0].weather[0].icon +
              "@2x.png";
            // weather descriptionnn
            //=> 1_speed
            let value1 = document.getElementById("value1");
            // console.log(result.list[0].wind.speed);
            value1.innerHTML = `${result.list[0].wind.speed}${" km/h"}`;
            //=> 2_ pressure
            let value3 = document.getElementById("value3");
            value3.innerHTML = `${result.list[0].main.pressure}${" hPa"}`;
            //=> 3_ Humidity
            let value4 = document.getElementById("value4");
            value4.innerHTML = `${result.list[0].main.humidity}${" %"}`;
            // 4_reel feel
            let value2 = document.getElementById("value2");
            value2.innerHTML = `${result.list[0].main.feels_like}${" °C"}`;
            // five days forecast
            //day 1
            let dayOne = document.getElementById("dayOne");
            dayOne.innerHTML = days[0];
            let dayOneImg = document.getElementById("dayOneImg");
            dayOneImg.src = `http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png`;
            // let dayOneW = document.getElementById("dayOneW");
            // console.log(result);
            // dayOneWinnerHTML = `${result.list[0].main.temp}`;
            //day 2
            let dayTwo = document.getElementById("dayTwo");
            dayTwo.innerHTML = days[1];
            //day 3
            let dayThree = document.getElementById("dayThree");
            dayThree.innerHTML = days[2];
            //day 4
            let dayFour = document.getElementById("dayFour");
            dayFour.innerHTML = days[3];
            //day 5
            let dayFive = document.getElementById("dayFive");
            dayFive.innerHTML = days[4];

            const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&${metric}`;
            fetchData(`${cityUrl}`)
              .then((result2) => {
                console.log(result2.name);
                let weather_today = document.getElementById("weather_today");
                weather_today.innerHTML = `<h1>${result2.main.temp}°C</h1>`;
                // date current
                let today_date = document.getElementById("today_date");
                let fdate = new Date().toLocaleDateString();
                today_date.innerHTML = `<h1>${fdate}</h1>`;
                // time
                let time = document.getElementById("time");
                let ftime = new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                time.innerHTML = `<h1>${ftime}</h1>`;
              })
              .catch((error2) => {
                console.error("Error fetching data:", error2);
              });
            location = result.city.name + "," + result.city.country;
            let cityName = document.getElementById("location");
            cityName.innerHTML = `<h1>${location}</h1>`;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      //function Error
      function (error) {
        console.error("Error getting location: " + error.message);
      },
      //options
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

// event input search..
// input_Search.addEventListener("change", () => {
//   const city = input_Search.value;
//   const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&${metric}`;
//   fetchData(cityUrl)
//     .then((data) => {
//       location = data.name + "," + data.sys.country;
//       let cityName = document.getElementById("location");
//       cityName.innerHTML = `<h1>${location}</h1>`;
//       let weather_today = document.getElementById("weather_today");
//       weather = data.main.temp;
//       weather_today.innerHTML = `<h1>${weather}°C</h1>`;
//       // //weather icon for all other countries ...
//       //   let weather_icon = document.getElementById("weather_icon");
//       console.log(data);
//       //   weather_icon.src =
//       //     "https://openweathermap.org/img/wn/" +
//       //     data.list[0].weather[0].icon +
//       //     "@2x.png";
//           console.log(result.list[0].wind.speed);
//           console.log(data);
//       // weather descriptionnn
//       //=> 1_speed
//       let value1 = document.getElementById("value1");
//       value1.innerHTML = `${data.wind.speed}${" km/h"}`;
//       //=> 2_ pressure
//       let value3 = document.getElementById("value3");
//       value3.innerHTML = `${data.main.pressure}${" hPa"}`;
//       //=> 3_ Humidity
//       let value4 = document.getElementById("value4");
//       value4.innerHTML = `${data.main.humidity}${" %"}`;
//       // 4_reel feel
//       let value2 = document.getElementById("value2");
//       value2.innerHTML = `${data.main.feels_like}${" °C"}`;
//       //=> 5_Sunrise
//       let value5 = document.getElementById("value5");
//       value5.innerHTML = `${data.sys.sunrise}${" UTC"}`;
//       //=> 6_Sunset
//       let value6 = document.getElementById("value6");
//       value6.innerHTML = `${data.sys.sunset}${" UTC"}`;
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// });

// Assuming fetchData is defined elsewhere in your code to make the API request
input_Search.addEventListener("change", () => {
  const city = input_Search.value;
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&${metric}`;
  fetchData(cityUrl)
    .then((data) => {
      location = data.name + "," + data.sys.country;
      let cityName = document.getElementById("location");
      cityName.innerHTML = `<h1>${location}</h1>`;
      let weather_today = document.getElementById("weather_today");
      let weather = data.main.temp;
      weather_today.innerHTML = `<h1>${weather}°C</h1>`;

      // Display weather icon
      let weather_icon = document.getElementById("weather_icon");
      weather_icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      // Display other weather details
      let value1 = document.getElementById("value1");
      value1.innerHTML = `${data.wind.speed} km/h`;

      let value2 = document.getElementById("value2");
      value2.innerHTML = `${data.main.feels_like} °C`;

      let value3 = document.getElementById("value3");
      value3.innerHTML = `${data.main.pressure} hPa`;

      let value4 = document.getElementById("value4");
      value4.innerHTML = `${data.main.humidity} %`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
