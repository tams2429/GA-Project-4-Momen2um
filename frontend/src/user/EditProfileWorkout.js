import React from 'react'

import ReactModal from 'react-modal'
import { getProfile, editProfile } from '../lib/api'
import { getPayload } from '../lib/auth'
import { customSuccessNotify, errorNotify } from '../lib/notification'
import { SettingFilled } from '@ant-design/icons'

class EditProfileWorkout extends React.Component {
  state = {
    modal: false,
    formData: null,
    errors: {}
  }

  async componentDidMount() {
    try {
      const userId = getPayload().sub
      const user = await getProfile(userId)
      this.setState( { formData: user.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleModal = () => {
    if (this.state.modal === false){
      this.setState({ modal: true })
    } else {
      this.setState({ modal: false })
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const userId = getPayload().sub
      await editProfile(userId, this.state.formData)
      const user = await getProfile(userId)
      this.setState( { formData: user.data })
      customSuccessNotify('Successfully updated profile, Now let\'s get back to the grind!', () => window.location.reload())
    } catch (err) {
      errorNotify('Something has gone wrong...')
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    if (!this.state.formData) return null
    return (
      <div className='editProfileWorkoutModal'>
        <SettingFilled onClick={this.handleModal} style={ { fontSize: '25px' } }/>
        <ReactModal
          isOpen={this.state.modal}
          onRequestClose={this.handleModal}
          className="column is-half is-offset-one-quarter box"
          style={
            {
              overlay: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        >
          <section className="section">
            <div className="container">
              <div className="column">
                <form onSubmit={this.handleSubmit} >
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.username ? 'is-danger shake' : '' }`}
                        placeholder="Username"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.formData.username}
                      />
                    </div>
                    {this.state.errors.username && <small className="help is-danger shake">{this.state.errors.username}</small>}
                  </div>
                  <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.first_name ? 'is-danger shake' : '' }`}
                        placeholder="First Name"
                        name="first_name"
                        onChange={this.handleChange}
                        value={this.state.formData.first_name}
                      />
                    </div>
                    {this.state.errors.first_name && <small className="help is-danger shake">{this.state.errors.first_name}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.last_name ? 'is-danger shake' : '' }`}
                        placeholder="Last Name"
                        name="last_name"
                        onChange={this.handleChange}
                        value={this.state.formData.last_name}
                      />
                    </div>
                    {this.state.errors.last_name && <small className="help is-danger shake">{this.state.errors.last_name}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.email ? 'is-danger shake' : ''}`}
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.formData.email}
                      />
                    </div>
                    {this.state.errors.email && <small className="help is-danger shake">{this.state.errors.email}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Profile Picture URL</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name="profile_image"
                        maxLength="400"
                        value={this.state.formData.profile_image}
                        onChange={this.handleChange}
                      />
                      <span></span>
                    </div>
                  </div>
                  <div className="field">
                    <button
                      type="submit"
                      className="button is-fullwidth"
                    >
                      Submit Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </ReactModal>
      </div>
    )
  }
}

export default EditProfileWorkout
