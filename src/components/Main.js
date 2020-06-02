import React, { useState } from "react"

import Context from "../Context"

import Header from "./Header"
import axios from "axios"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeatherData"
import Error from "./Error"

const Main = () => {

    const [weather, setWeather] = useState()
    const [city, setCity] = useState()
    const [error, setError] = useState()

    const api_call = async e => {
        e.preventDefault()
        const location = e.target.location.value
        if(!location) return setError("Please enter the name of city"), setWeather(null)
        if(location) setError(null)
        const API_KEY = "4c08155a98f8ce383dde065b6c1f5920"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        const request = axios.get(url)
        const response = await request
        setWeather(response.data.main)
        setCity(response.data.name)
    }

    weather && console.log(weather)

    return (
        <div className="main">
            <Header />
            <Content>
                <Context.Provider value = {{api_call, weather, city}}>
                    <WeatherSearch />
                    { weather && <WeatherData />}
                    { error && <Error error = {error}/>}
                </Context.Provider>
            </Content>
        </div>
    )
}

export default Main 