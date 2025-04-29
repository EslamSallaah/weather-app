import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../images/search.png'
import clear_icon from '../images/sun.png'
import cloudy_icon from '../images/cloudy.png'
import rain_icon from '../images/heavy-rain.png'
import wind_icon from '../images/wind.png'

import humidty_icon from '../images/humidity.png'
const Weather = () => {

const [weatherData, setWeatherData] = useState(false);
const [city, setCity] = useState("new york")

const allIcons={ 
    "o1d": clear_icon,
    "01n": clear_icon,

    "o2d": cloudy_icon,
    "02n": cloudy_icon,
    "o3d": rain_icon,
    "03n": rain_icon,
    "o4d": wind_icon,
    "04n": wind_icon, 
}

const Search= async(city)=>{
try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=14e2982e021f78d49dd3f13c2ebe4951`;

const response= await fetch(url);
const data= await response.json();
console.log(data);
const icon=allIcons[data.weather[0].icon] || clear_icon;
setWeatherData({
 humidty: data.main.humidity,
 wind: data.wind.speed,
    location: data.name,
    icon: icon,
    temprature: Math.floor(data.main.temp),
    weather: data.weather[0].main,
});
} catch (error) {
    console.log(error)

}
}
useEffect(() => {
Search("new york");


}, [])



  return (
    <div className="weather">
        <div className='search-bar'>
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="search" />      
        <img
          onClick={() => Search(city)}
          src={search_icon}
          alt="search icon"
       />        </div>
  <img src={clear_icon} alt='' className='weather-icon'/>
  <p className='temprature'>{weatherData.temprature}</p>
  <p className='location'>{weatherData.location}</p>

    <div className='weather-data'>
        <div className='col'>
            <img src={wind_icon} alt='' className='wind-icon' width={100}/>
            <div>
<p>{weatherData.wind} km</p>
<span> windy</span>

 </div>
  </div>  
  <div className='col'>
            <img src={humidty_icon} alt='' className='humidty-icon' width={100}/>
            <div>
<p>{weatherData.humidity} %</p>
<span> humidity</span>

 </div>
  </div>  
    </div>
      </div>
)
}

export default Weather
