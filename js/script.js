  const sunrise = new Date().setHours(6, 0, 0);
  const sunset  = new Date().setHours(18, 0, 0);
  const now     = Date.now();
  const apikey = "845ff1af71522d84488f91ed28e09927"; 
  const weatherform = document.querySelector(".weatherform");
  const cityinput = document.querySelector(".input");
  let progress = (now - sunrise) / (sunset - sunrise);
  progress = Math.min(Math.max(progress, 0), 1);

  const arc = document.getElementById("arcFill");
  const sun = document.getElementById("sun");

  const length = arc.getTotalLength();

  // Solid arc up to sun
  arc.style.strokeDasharray = `${length * progress} ${length}`;
// arc.style.transition = "stroke-dasharray 0.6s ease";
// sun.style.transition = "cx 0.6s, cy 0.6s";

  // Sun position
  const point = arc.getPointAtLength(length * progress);
  sun.setAttribute("cx", point.x);
  sun.setAttribute("cy", point.y);


  // const line_1 = document.getElementsByClassName("line1");
//   const future_weather = document.querySelectorAll(".future_weather");
//   const line1 = document.querySelector(".line1");
//   console.log(future_weather);
//  future_weather[0].addEventListener("click", ()=>{
//     console.log("clicked");
//     line1.classList.add("hide");
//   });
document.querySelector(".future").addEventListener("click", (e) => {
  const item = e.target.closest(".future_weather");
  if (!item) return;

  document.querySelectorAll(".line").forEach(l =>
    l.classList.remove("active")
  );
  item.querySelector(".line").classList.add("active");
});

weatherform.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityinput.value;

  if(city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }

    catch(error) {
      console.error(error);
      displayError(error);
    }
  }

  else {
    displayError("Please enter city");
  }
});

async function getWeatherData(city) {
  const apiurl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  // const apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${apikey}`;
  const response = await fetch(apiurl);
  console.log(response);

  if(!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}
function displayWeatherInfo(data){
  console.log(data);
}
function displayError(message) {
  alert(message);
}