import React from 'react'

import { getRandomImage } from './lib/api'

import Weather from './components/Weather'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './user/Profile'
import EditProfileWorkout from './user/EditProfileWorkout'
import News from './components/News'
import Welcome from './components/Welcome'
import CountDownTimer from './components/Countdown'
import VideoPlayer from './components/VideoPlayer'
import ToDoList from './components/ToDoList'
import ErrorPage from './components/ErrorPage'
import { ToastContainer } from 'react-toastify'

class App extends React.Component {
  state= {
    image: null
  }

  async componentDidMount() {
    const image = await getRandomImage()
    this.setState( { image: image.data.urls.full } )
  }

  render() {
    if (!this.state.image) return null
    return (
      <div className="mainContainer" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + this.state.image + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
        <div className="topRow layoutContainer">
          <div className="topLHS">
            <Weather />
          </div>
          <div className="topRHS">
            <div className="admin">
              <Login />
              <Register />
              <Profile />
              <EditProfileWorkout />
            </div>
          </div>
        </div>
        <div className="middleRow">
          <div className="middleTop">
            <div className="middleTopLHS">
              <News />
            </div>
            <div className="middleTopMain">
              <Welcome />
            </div>
            <div className="middleTopRHS">
              <ToDoList />
            </div>
          </div>
          <div className="middleMain">
            <CountDownTimer />
          </div>
          <div className="middleBottom">
            <VideoPlayer />
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default App
