const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("#searchInput");
const message = wrapper.querySelector(".wrapper .message");
const infoSection = wrapper.querySelector(".wrapper .weather-info");
const weatherInfo = document.querySelector(".weather-details");
const stateName  = weatherInfo.querySelector(".weather-details h2");
const condition  = weatherInfo.querySelector(".weather-details p");
const place  = weatherInfo.querySelector(".weather-details span");
const image  = weatherInfo.querySelector(".weather-details .weather-img img");
const feelsLike  = document.querySelector(".current-condition .feels span");
const humidity  = document.querySelector(".current-condition .humidity span");
const  btn = document.querySelector(".geolocation-btn");
const arrow =  document.querySelector(".weather-search span");


let API_KEY = `927e257994f74a268bd145444220906` 

// fetching data from search

function weatherDetails(weather, value){
    if(weather){
        message.innerHTML = `Weather in ${value} has been fetched.`,
        message.classList.add("success"),
        message.classList.remove("error"),
        weatherInfo.classList.remove("active")
        infoSection.classList.add("active"),
        image.src = `https:${weather.current.condition.icon}`
        stateName.innerHTML = `${weather.current.temp_c}<sup>o</sup>C`,
        condition.textContent = `${weather.current.condition.text}`,
        place.textContent = `${weather.location.name}, ${weather.location.country}`
        feelsLike.innerHTML = `${weather.current.feelslike_c}<sup>o</sup> C`
        humidity.textContent = `${weather.current.humidity}%`
        // console.log(weather)
    }else{
        alert(2)
    }
}

// fetching data from search
function fetchData(value){
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${value}`)
    .then(res => res.json())
    .then(result => weatherDetails(result, value));
    arrow.classList.remove("active");
}
searchInput.addEventListener("keyup", (e)=>{
    if(e.key == "Enter" && searchInput.value != ""){
        message.classList.remove("active")
        message.innerHTML = `Fetching weather in ${searchInput.value}`
       fetchData(searchInput.value);
       searchInput.value = "";
    }
});
// fetching data from geolocation
function geolocate(weather){
        weatherInfo.classList.remove("active")
        infoSection.classList.add("active")
        image.src = `https:${weather.current.condition.icon}`
        stateName.innerHTML = `${weather.current.temp_c}<sup>o</sup>C`
        condition.textContent = `${weather.current.condition.text}`
        place.textContent = `${weather.location.name}, ${weather.location.country}`
        feelsLike.innerHTML = `${weather.current.feelslike_c}<sup>o</sup>C`
        humidity.textContent = `${weather.current.humidity}%`
}
// geolocation  success
function onSuccess(success){
    const {latitude, longitude} = success.coords
        message.classList.remove("active")
        message.textContent = `fetching weather of your location`
        message.classList.add("success")
        message.classList.remove("error")
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude}&q=${longitude}`)
    .then(res => res.json())
    .then(result=> geolocate(result));
    arrow.classList.remove("active")   
}
// geolocation error
function onError(error){
    message.classList.remove("active")
    message.innerHTML = error.message,
    message.classList.add("error"),
    message.classList.remove("success")
}
// go back to search input
arrow.addEventListener("click", ()=>{
    weatherInfo.classList.add("active");
    infoSection.classList.remove("active");
    arrow.classList.add("active")
    message.classList.add("active")
})
// geolocation btn 
btn.addEventListener("click", ()=>{
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
});
