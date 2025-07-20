import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { useState } from "react";
import axios from 'axios';
import Loading from "./Loading";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const API_KEY="86eebf0545b3652c11b5223880e77d4e";
  const [search,setSearch]= useState("");
  const [loading,setLoading]= useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");

  const fetchWeather = async ()=>{
    if(!search) return;
    setLoading(true);
    try {
      const {data} =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`)
      console.log(data);
      if(data.cod == 200){
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
      
    } catch (error) {
      console.log(error);
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setCityName("City Not Found !");
      setWeatherIcon("01d");
    }
    setLoading(false);
  }

  return (
    
    
    <div className="box">
      <div className="inputBox">
      <input 
          type="text" 
          className="input"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search" />
      <FaSearch onClick={fetchWeather} className="search"/>
      </div>

      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="no Image" />

      <div className="secondBox">
          {/* Temprature & CityName */}
          <h1>
              {loading
                ? <Loading/>
                : temperature !== null
                ? `${temperature}°C`
                : "--"}
            </h1>
            <h2>
              {cityName || "type to check temperature"}
            </h2>

            {/* Humadity & Wind Speed */}
            
              <div>
                <WiHumidity />
                <span>
                  {humidity !== null ? `${humidity}%` : "--"}
                </span>
                <p>Humidity</p>
              </div>
              <div >
                <WiStrongWind />
                <span >
                  {windSpeed !== null ? `${windSpeed}km/h` : "--"}
                </span>
                <p>Wind Speed</p>
              </div>
      </div>
    </div>
  );
}

export default App;
