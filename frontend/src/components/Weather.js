import React from 'react'

import { getWeatherByCity } from '../lib/api'
import { errorNotify } from '../lib/notification'

class Weather extends React.Component {
  state = {
    weather: null,
    lat: null,
    long: null
  }

  async componentDidMount() {
    try {
      this.handleGetWeather()
      setInterval(this.handleGetWeather, 300000)
    } catch (err) {
      errorNotify('Looks like we cannot fetch the weather information for you, not that you will be going out anytime soon...')
    }
  }

  handleGetWeather = async() => {
    const cityName = 'London'
    const weather = await getWeatherByCity(cityName)
    this.setState( { weather: weather.data } )
  }

  render() {
    if (!this.state.weather) return null
    return (
      <div className="weatherInfo">
        <div className="weatherText">
          <div className="weatherLocation">
            <p className="title">{this.state.weather.name}, </p>
          </div>
          <div className="weatherTitles">
            <p className="title">{this.state.weather.weather[0].main}, </p>
            <p className="title">{Math.floor(this.state.weather.main.temp)}°C</p>
          </div>
        </div>
        {this.state.weather.weather[0].icon === '01n' ?
          <figure className="image">
            <img className="weather-img" src={'http://openweathermap.org/img/wn/01d@2x.png'} alt="Weather icon"></img>
          </figure>
          :
          <figure className="image weather">
            <img className="weather-img" src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`} alt="Weather icon"></img>
          </figure>
        }
      </div>
    )
  }
}

export default Weather
