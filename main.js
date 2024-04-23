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
  return `${year}-${month}-${day}`;
}
for (let i = 0; i < 6; i++) {
  today.setDate(today.getDate() + 1);
  days.push(formatDate(today));
}
input_Search.addEventListener("change", function () {
  console.log(days);
});

// api
let latitude;
let longitude;
let city = input_Search.value;
let metric = "units=metric";
const api_key = "3d57b696db2bbf1337326cdf28fd0fd5";
// const geoUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
// const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

let fetchData = async function (url) {
  try {
    console.log(url);
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Success callback
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const geoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&${metric}`;
        fetchData(`${geoUrl}`);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      function (error) {
        // Error callback
        console.error("Error getting location: " + error.message);
      },
      {
        // Options
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    // Geolocation is not supported
    console.log("Geolocation is not supported by this browser.");
  }
});

// const input_Search = document.getElementById("input-search");
input_Search.addEventListener("change", () => {
  const city = input_Search.value;
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&${metric}`;
  fetchData(cityUrl);
});
