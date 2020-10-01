import React from 'react'

import ReactPlayer from 'react-player'
import { Input } from 'antd'
import { errorNotify } from '../lib/notification'

const { Search } = Input

class VideoPlayer extends React.Component {
  state = {
    url: ''
  }

  handleSearch = (url) => {
    if (!ReactPlayer.canPlay(url)) {
      return errorNotify(`'${url}' is not a valid url`)
    }
    this.setState( { url: url } )
  }

  render() {
    return (
      <div className="playerWrapper">
        <Search
          placeholder="URL goes here..."
          enterButton="Search"
          size="large"
          onSearch={value => this.handleSearch(value)}
        />
        <br/>
        <ReactPlayer
          url={this.state.url}
          className='reactPlayer'
          width='100%'
          height='100%'
          controls
        />
      </div>
    )
  }
}

export default VideoPlayer
