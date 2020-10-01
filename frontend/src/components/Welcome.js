
import React from 'react'

import { getProfile, getProgrammingQuote } from '../lib/api'
import { getPayload } from '../lib/auth'

class Welcome extends React.Component {
  state = {
    user: null,
    quote: ''
  }

  async componentDidMount() {
    try {
      if (!getPayload().sub) {
        throw new Error('User not logged in')
      }
      const userId = getPayload().sub
      console.log('userId is:', userId)
      const user = await getProfile(userId)
      this.handleGetProgrammingQuote()
      this.setState( { user: user.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleGetProgrammingQuote = async() => {
    const quote = await getProgrammingQuote()
    this.setState( { quote: quote.data.en } )
  }

  render() {
    if (!this.state.user) return null
    return (
      <div className="welcomeContainer">
        <h1 className="welcomeMessage">Welcome Back {this.state.user.first_name}</h1>
        <q className="welcomeQuote">{this.state.quote}</q>
      </div>
    )
  }
}

export default Welcome
