import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Loader from 'halogen/RingLoader'
import { Redirect } from 'react-router-dom'
import * as Buzz from '../images/fbuzz.png'
import * as Sting from '../images/fsting.png'
import { Button } from 'react-bootstrap'

@Radium
export default class BuzzForm extends React.Component {
  styles = {
    buzzForm: {
      flexDirection: 'column',
      fontSize: '14px',
    },
    inputGroup: {
    },
    label: {
      marginBottom: '30px',
    },
    inputElement: {
      width: '500px',
      height: '50px',
      fontSize: '16px',
      display: 'inline-block',
      padding: '15px 10px',
      backgroundColor: 'rgb(250, 250, 250)',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
    },
    textArea: {
      height: '150px',
      marginTop: '0px',
      resize: 'none',
    },
    select: {
      marginTop: '25px',
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
      <form className="search-form">
        <h3>How would you define your experience?</h3>
        <div className="img-card">
          <img
            title="Buzz!"
            onClick={this.handleImgChange}
            src={Buzz.default}
            style={{ opacity: this.state.buzz ? 1.0 : 0.1 }}
          />
        </div>
      <div className="img-card">
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
            <h3 style={this.styles.label}>
              <label>
                Why are you leaving a {this.state.buzz ? 'buzz' : 'sting'}?:
              </label>
            </h3>
            <textarea className="m-b-100"
                style={Object.assign(
                    {},
                    this.styles.inputElement,
                    this.styles.textArea
                )}
                value={this.state.reason}
                onChange={this.handleReasonChange}
            />

          </div>
          <div style={this.styles.inputGroup}>
            <h3 style={this.styles.label}>
              <label>Relationship to individual with special needs?</label>
            </h3>

            <div className="radio-grp m-b-100">
              <div className="radio">
                <h3>Self</h3>

                <label><input type="radio" name="optradio" /></label>
              </div>
              <div className="radio">
                <h3>Parent/<br/>Guardian</h3>
                <label><input type="radio" name="optradio" /></label>
              </div>
              <div className="radio disabled">
                <h3>Other</h3>
                <label><input type="radio" name="optradio" /></label>
              </div></div>

          </div>

          <div style={this.styles.inputGroup}>
            <h3 style={this.styles.label}>
              <label>One last thing before you submit</label>
            </h3>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              style={this.styles.inputElement}
            />

          </div>
          <em>
            Don't Worry we will not display or share your email with anyone!
          </em>
          <div className="m-t-40  btn-grp">
            <Button onClick={this.handleSubmit} className="theme-btn">Submit</Button>
          </div>
        </div>
      </form>
    )
  }
}

BuzzForm.propTypes = {
  placeId: PropTypes.string.isRequired,
}
