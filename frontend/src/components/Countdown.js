import React from 'react'

import moment from 'moment'
import { Statistic } from 'antd'

const { Countdown } = Statistic

class CountDownTimer extends React.Component {
  state = {
    dayDeadline: null,
    breakDeadline: null,
    workoutDeadline: null,
    doNotDisturb: false
  }

  componentDidMount(){
    const today = moment()
    const dayEnd = moment().endOf('day')
    const timeLeft = dayEnd.diff(today)
    const dayDeadline = Date.now() + timeLeft
    this.breakTimer()
    this.setState( { dayDeadline: dayDeadline } )
  }

  breakTimer = () => {
    const today = moment()
    const breakTime = moment().add(20, 'seconds')
    const timeLeftTillBreak = breakTime.diff(today)
    const breakDeadline = Date.now() + timeLeftTillBreak
    this.setState( { breakDeadline: breakDeadline } )
  }

  workoutTimer = () => {
    if (!this.state.workoutDeadline) {
      const today = moment()
      const workoutTime = moment().add(1, 'minutes')
      const workoutTimeLeft = workoutTime.diff(today)
      const workoutDeadline = Date.now() + workoutTimeLeft
      this.setState( { workoutDeadline: workoutDeadline } )
    } else {
      this.setState( { workoutDeadline: null } )
    }
  }

  render() {
    if (!this.state.dayDeadline) return null
    return (
      <div className="countdownContainer">
        <p>Do Not Disturb icon goes here</p>
        {/* <i class="bell slash icon"></i>
        <i class="bell slash outline icon"></i> */}
        {!this.state.workoutDeadline ?
          <div className="countdownTimer">
            <Countdown className='dayCountdown' title="Time until Day End:" value={this.state.dayDeadline}  />
            <Countdown className='breakCountdown' title="Time to Break" value={this.state.breakDeadline} onFinish={this.workoutTimer}  />
          </div>
          :
          <div className="countdownTimer">
            <Countdown className='workoutCountdown' title="Workout Timer" value={this.state.workoutDeadline} onFinish={() => {
              this.workoutTimer()
              this.breakTimer()
            }
            }/>
            <Countdown className='filler' title="Filler Timer" value={this.state.workoutDeadline}  />
          </div>
        }
      </div>
    )
  }
}

export default CountDownTimer
