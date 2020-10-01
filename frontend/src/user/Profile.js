import React from 'react'

import { getProfile } from '../lib/api'
import { Popover } from 'antd'
import { getPayload } from '../lib/auth'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

class Profile extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    try {
      if (!getPayload().sub) {
        throw new Error('User not logged in')
      }
      const userId = getPayload().sub
      console.log('User Id is:', userId)
      const user = await getProfile(userId)
      console.log('User response object is:', user)
      this.setState( { user: user.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('this.state is', this.state.user)
    if (!this.state.user) return null
    return (
      <Popover placement="bottomRight" title={'Your Profile'}
        content={
          <div className="profileContainer">
            <img src={this.state.user.profile_image !== '' ? this.state.user.profile_image : 'https://content.thriveglobal.com/wp-content/uploads/2019/08/dreamstime_m_113300511-1.jpg?w=1550'} className="profileImage" alt="Profile Image"></img>
            <h2 className="profileName">{this.state.user.first_name + ' ' + this.state.user.last_name}</h2>
            <h2 className="profileEmail">{this.state.user.email}</h2>
            <p className="profileCreated">Productive since: {this.state.user.date_joined.slice(0,10)}</p>
          </div>
        }
        trigger="click">
        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Popover>
    )
  }
}

export default Profile
