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
// your location
let current_location = document.getElementById("current_location");
current_location.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.reload();
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
    bd.style.color = "white";
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
// //btn select option celsius to FEH...
// let celsius = document.getElementById("celsius");
// console.log(celsius.textContent);
// let fahrenheit = document.getElementById("fahrenheit");
// if ((celsius.textContent = celsius)) {
//   let metric = "units=metric";
// } else {
//   let metric = "units=imperial";
// }
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
// five value in box chartData...

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
            const city = result.city.name;
            displayForCast(city);
            //weather icon
            let weather_icon = document.getElementById("weather_icon");
            weather_icon.src =
              "https://openweathermap.org/img/wn/" +
              result.list[0].weather[0].icon +
              "@2x.png";
            // weather descriptionnn
            //=> 1_speed
            let value1 = document.getElementById("value1");
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
            /* ----------------------------------------------------*/
            //day 1
            const dayOne = document.getElementById("dayOne");
            const options = {
              weekday: "long",
            };
            let fdate = new Date();
            fdate.setDate(fdate.getDate() + 1);
            fdate = fdate.toLocaleDateString("en-US", options);
            dayOne.innerHTML = `<h1>${fdate}</h1>`;

            //icon day1
            let dayOneImg = document.getElementById("dayOneImg");
            dayOneImg.src = `http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png`;
            console.log(result);
            //weather day1
            let dayOneW = document.getElementById("dayOneW");
            dayOneW.innerHTML = `${result.list[0].main.temp}${" °C"}`;
            /* ----------------------------------------------------*/
            //day 2
            // Day 2
            let dayTwo = document.getElementById("dayTwo");
            fdate = new Date();
            fdate.setDate(fdate.getDate() + 2);
            fdate = fdate.toLocaleDateString("en-US", options);
            dayTwo.innerHTML = `<h1>${fdate}</h1>`;
            // Icon day 2
            let dayTwoImg = document.getElementById("dayTwoImg");
            dayTwoImg.src = `http://openweathermap.org/img/wn/${result.list[5].weather[0].icon}.png`;
            // Weather day 2
            let dayTwoW = document.getElementById("dayTwoW");
            dayTwoW.innerHTML = `${result.list[5].main.temp} °C`;
            /* ----------------------------------------------------*/
            //day 3
            let dayThree = document.getElementById("dayThree");
            fdate = new Date();
            fdate.setDate(fdate.getDate() + 3);
            fdate = fdate.toLocaleDateString("en-US", options);
            dayThree.innerHTML = `<h1>${fdate}</h1>`;
            // Icon day 2
            let dayThreeImg = document.getElementById("dayThreeImg");
            dayThreeImg.src = `http://openweathermap.org/img/wn/${result.list[13].weather[0].icon}.png`;
            // Weather day 2
            let dayThreeW = document.getElementById("dayThreeW");
            dayThreeW.innerHTML = `${result.list[10].main.temp} °C`;
            /* ----------------------------------------------------*/
            //day 4
            let dayFour = document.getElementById("dayFour");
            fdate = new Date();
            fdate.setDate(fdate.getDate() + 4);
            fdate = fdate.toLocaleDateString("en-US", options);
            dayFour.innerHTML = `<h1>${fdate}</h1>`;
            // Icon day 2
            let dayFourImg = document.getElementById("dayFourImg");
            dayFourImg.src = `http://openweathermap.org/img/wn/${result.list[20].weather[0].icon}.png`;
            // Weather day 2
            let dayFourW = document.getElementById("dayFourW");
            dayFourW.innerHTML = `${result.list[15].main.temp} °C`;
            /* ----------------------------------------------------*/
            //day 5
            let dayFive = document.getElementById("dayFive");
            fdate = new Date();
            fdate.setDate(fdate.getDate() + 5);
            fdate = fdate.toLocaleDateString("en-US", options);
            dayFive.innerHTML = `<h1>${fdate}</h1>`;
            // Icon day 2
            let dayFiveImg = document.getElementById("dayFiveImg");
            dayFiveImg.src = `http://openweathermap.org/img/wn/${result.list[29].weather[0].icon}.png`;
            // Weather day 2
            let dayFiveW = document.getElementById("dayFiveW");
            dayFiveW.innerHTML = `${result.list[20].main.temp} °C`;
            /* ----------------------------------------------------*/
            //current-Weather
            const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&${metric}`;
            fetchData(`${cityUrl}`)
              .then((result2) => {
                console.log(result2.name);
                let weather_today = document.getElementById("weather_today");
                weather_today.innerHTML = `<h1>${result2.main.temp}°C</h1>`;
                // date current
                let today_date = document.getElementById("today_date");
                const options = {
                  weekday: "long",
                };
                let fdate = new Date().toLocaleDateString("en-US", options);
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

input_Search.addEventListener("change", () => {
  const city = input_Search.value;
  const cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&${metric}`;
  fetchData(cityUrl)
    .then((data) => {
      console.log(data);
      const location = data.city.name + "," + data.city.country;
      const cityName = document.getElementById("location");
      cityName.innerHTML = `<h1>${location}</h1>`;
      const weather_today = document.getElementById("weather_today");
      const weather = data.list[0].main.temp;
      weather_today.innerHTML = `<h1>${weather}</h1>`;
      //weather icon  --------------
      const weather_icon = document.getElementById("weather_icon");
      const ic = data.list[0].weather[0].icon;
      weather_icon.src = `https://openweathermap.org/img/wn/${ic}@2x.png`;
      //weather details
      const value1 = document.getElementById("value1");
      value1.innerHTML = `${data.list[0].wind.speed} km/h`;
      const value2 = document.getElementById("value2");
      value2.innerHTML = `${data.list[0].main.feels_like} °C`;
      const value3 = document.getElementById("value3");
      value3.innerHTML = `${data.list[0].main.pressure} hPa`;
      const value4 = document.getElementById("value4");
      value4.innerHTML = `${data.list[0].main.humidity} %`;
      // five days forecast
      /* ----------------------------------------------------------------------*/
      // Day 1
      const dayOne = document.getElementById("dayOne");
      dayOne.innerHTML = days[0];
      // Weather icon day 1
      const dayOneImg = document.getElementById("dayOneImg");
      dayOneImg.src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png`;
      // Weather day 1
      const dayOneW = document.getElementById("dayOneW");
      dayOneW.innerHTML = `<h1>${data.list[0].main.temp}°C</h1>`;
      /* ----------------------------------------------------------------*/
      // day2
      const dayTwo = document.getElementById("dayTwo");
      dayTwo.innerHTML = days[1];
      //weather icon
      const dayTwoImg = document.getElementById("dayTwoImg");
      dayTwoImg.src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png`;
      //weather day2
      const dayTwoW = document.getElementById("dayTwoW");
      dayTwoW.innerHTML = `<h1>${data.list[5].main.temp}°C</h1>`;
      /* -------------------------------------------------------------------*/
      // day2
      const dayThree = document.getElementById("dayThree");
      dayThree.innerHTML = days[2];
      //weather icon
      const dayThreeImg = document.getElementById("dayThreeImg");
      dayThreeImg.src = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png`;
      //weather day2
      const dayThreeW = document.getElementById("dayThreeW");
      dayThreeW.innerHTML = `<h1>${data.list[13].main.temp}°C</h1>`;
      /* -------------------------------------------------------------------*/
      //day3
      const dayFour = document.getElementById("dayFour");
      dayFour.innerHTML = days[3];
      //weather icon
      const dayFourImg = document.getElementById("dayFourImg");
      dayFourImg.src = `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}.png`;
      //weather day2
      const dayFourW = document.getElementById("dayFourW");
      dayFourW.innerHTML = `<h1>${data.list[21].main.temp}°C</h1>`;
      /* -------------------------------------------------------------------*/
      //day4
      const dayFive = document.getElementById("dayFive");
      dayFive.innerHTML = days[4];
      //weather icon
      const dayFiveImg = document.getElementById("dayFiveImg");
      dayFiveImg.src = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png`;
      //weather day2
      const dayFiveW = document.getElementById("dayFourW");
      dayFiveW.innerHTML = `<h1>${data.list[29].main.temp}°C</h1>`;
      /* -------------------------------------------------------------------*/
      console.log(data.list[0]);
      displayForCast(location);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  // for clearr input after search
  // input_Search.value = " ";
});

/*----------------------------------> CHART JS <--------------------------------*/
function displayForCast(cityName) {
  let forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&${metric}`;
  fetch(forcastUrl)
    .then((response) => response.json())
    .then((data1) => {
      console.log(data1);
      const forecastByDate = [];
      const fiveForecastDay = data1.list.filter((item) => {
        const date = new Date(item.dt_txt).getDate();
        if (!forecastByDate.includes(date)) {
          return forecastByDate.push(date);
        }
      });
      // filtrer DATE
      const forecastsDays = fiveForecastDay.map((el) => {
        const date = new Date(el.dt_txt).toLocaleString("en-US", {
          weekday: "long",
        });
        return date;
      });
      forecastsDays.forEach((el) => {
        console.log("Date:", el.date);
      });
      //filtrer (weather)
      const forecastsTemp = fiveForecastDay.map((el) => {
        const chartData = el.main.temp;
        return chartData;
      });
      forecastsTemp.forEach((el) => {
        console.log("Température:", el.chartData);
      });

      const ctx = document.getElementById("myChart");
      console.log(ctx);
      new Chart(ctx, {
        type: "line",
        data: {
          labels: forecastsDays,
          datasets: [
            {
              label: "Weather",
              data: forecastsTemp,
              borderWidth: 5,
              borderColor: "#FFC16A"
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again.");
    });
}
/*----------------------------------> CHART JS fin<--------------------------------*/
