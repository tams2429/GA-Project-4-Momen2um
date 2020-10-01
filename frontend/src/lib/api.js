import axios from 'axios'

import { getToken } from './auth'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

const openweatherApiAccessToken = process.env.REACT_APP_OPENWEATHERMAP_ACCESS_TOKEN
const newsApiAccessToken = process.env.REACT_APP_NEWS_ACCESS_TOKEN
const deploymentNewsApiAccessToken = process.env.REACT_APP_NEWS_DEPLOYMENT_ACCESS_TOKEN
const unsplashApiAccessToken = process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN

//* Login and Register Requests
export const register = formData => {
  return axios.post('/api/auth/register/', formData)
}

export const login = formData => {
  return axios.post('/api/auth/login/', formData)
}

//* Profile Page Requests
export const getProfile = (id) => {
  return axios.get(`/api/auth/profile/${id}/`)
}

export const editProfile = (id, formData) => {
  return axios.put(`/api/auth/profile/${id}/`, formData,  withHeaders())
}

export const getAllWorkouts = () => {
  return axios.get('/api/workouts/')
}

export const getSingleWorkout = (id) => {
  return axios.get(`/api/workouts/${id}/`)
}

export const createWorkout = formData => {
  return axios.post('/api/workouts/', formData, withHeaders())
}

export const editWorkout = (id, formData) => {
  return axios.put(`/api/workouts/${id}/`, formData, withHeaders())
}

export const deleteWorkout = (id) => {
  return axios.delete(`/api/workouts/${id}/`, withHeaders())
}

export const getAllExercises = () => {
  return axios.get('/api/exercises/')
}

export const getSingleExercise = (id) => {
  return axios.get(`/api/exercises/${id}/`)
}

//* To do list requests
export const addTodo = (formData) => {
  return axios.post('/api/todos/', formData, withHeaders())
}

export const deleteTodo = (id) => {
  return axios.delete(`/api/todos/${id}/`, withHeaders())
}

//* Weather API requests
export const getWeatherByCity = (cityName) => {
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${openweatherApiAccessToken}`)
}

//* News API requests
export const getBBCNews = () => {
  return axios.get(`https://newsapi.org/v2/top-headlines?pageSize=10&sources=bbc-news&apiKey=${newsApiAccessToken}`)
}

export const getWorldNews = () => {
  return axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&topic=world&token=${deploymentNewsApiAccessToken}`)
}

//* Programming Quotes API requests
export const getProgrammingQuote = () => {
  return axios.get('https://programming-quotes-api.herokuapp.com/quotes/random')
}

//* Unsplash API requests
export const getRandomImage = () => {
  return axios.get(`https://api.unsplash.com/photos/random?query=landscape&orientation=landscape&client_id=${unsplashApiAccessToken}`)
}







