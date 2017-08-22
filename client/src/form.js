import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Loader from 'halogen/RingLoader'
import { Redirect } from 'react-router-dom'
import * as Buzz from '../images/transparent_buzz.png'
import * as Sting from '../images/transparent_sting.png'

@Radium
export default class BuzzForm extends React.Component {
  styles = {
    buzzForm: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      fontSize: '14px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'row',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
    },
    inputElement: {
      width: '500px',
      height: '50px',
      fontSize: '16px',
      marginLeft: '25px',
      marginBottom: '10px',
    },
    textArea: {
      height: '250px',
      marginTop: '25px',
      resize: 'none',
    },
    select: {
      marginTop: '25px',
    },
    submit: {
      backgroundColor: '#2C9647',
      color: '#FFFFFF',
      boxShadow:
        '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
      border: 'none',
      borderRadius: '2px',
      height: '36px',
      margin: '10px 0 0 0',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0',
      overflow: 'hidden',
      cursor: 'pointer',
      textAlign: 'center',
      lineHeight: '36px',
      verticalAlign: 'middle',
      padding: '0 16px',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      buzz: true,
      reason: '',
      email: '',
      relationship: 'self',
      placeId: props.placeId,
    }
  }

  handleImgChange = e => {
    this.setState({ buzz: e.target.title.includes('Buzz') })
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value })
  }

  handleRelationshipChange = e => {
    this.setState({ relationship: e.target.value })
  }

  handleReasonChange = e => {
    this.setState({ reason: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (
      !this.state.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({ emailError: true })
    } else {
      this.setState({ emailError: null, loading: true })
      fetch('reviews', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          review: {
            placeId: this.state.placeId,
            buzz: this.state.buzz ? 'buzz' : 'sting',
            email: this.state.email,
            reason: this.state.reason,
            relationship: this.state.relationship,
          },
        }),
      })
        .then(() => {
          this.setState({ loading: false, redirect: true })
        })
        .catch(error => {
          console.error('failure', error) // eslint-disable-line no-console
        })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ margin: '100px auto', width: '32px' }}>
          <Loader color="#26A65B" size="32px" margin="4px" />
        </div>
      )
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/spots/${this.state.placeId}`,
          }}
        />
      )
    }
    return (
      <form>
        <div style={this.styles.inputGroup}>
          <img
            title="Buzz!"
            onClick={this.handleImgChange}
            src={Buzz.default}
            style={{ opacity: this.state.buzz ? 1.0 : 0.1 }}
          />
          <img
            title="Sting!"
            onClick={this.handleImgChange}
            src={Sting.default}
            style={{ opacity: this.state.buzz ? 0.1 : 1.0 }}
          />
        </div>
        <div style={this.styles.buzzForm}>
          {this.state.emailError &&
            <div style={{ color: 'red', marginBottom: '10px' }}>
              A valid email is required to submit a{' '}
              {this.state.buzz ? 'buzz' : 'sting'}.
            </div>}
          <div style={this.styles.inputGroup}>
            <div style={this.styles.label}>
              <label>Email:</label>
            </div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              style={this.styles.inputElement}
            />
          </div>
          <em>
            Don't worry, we won't display your email to other users or share it
            with anyone!
          </em>
          <div style={this.styles.inputGroup}>
            <div style={this.styles.label}>
              <label>Relationship:</label>
            </div>
            <select
              value={this.state.relationship}
              onChange={this.handleRelationshipChange}
              style={Object.assign(
                {},
                this.styles.inputElement,
                this.styles.select
              )}
            >
              <option value="self">Self</option>
              <option value="parent">Parent</option>
              <option value="guardian">Legal Guardian</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={this.styles.inputGroup}>
            <div style={this.styles.label}>
              <label>
                Why are you leaving a {this.state.buzz ? 'buzz' : 'sting'}?:
              </label>
            </div>
            <textarea
              style={Object.assign(
                {},
                this.styles.inputElement,
                this.styles.textArea
              )}
              value={this.state.reason}
              onChange={this.handleReasonChange}
            />
          </div>
          <button onClick={this.handleSubmit} style={this.styles.submit}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

BuzzForm.propTypes = {
  placeId: PropTypes.string.isRequired,
}
