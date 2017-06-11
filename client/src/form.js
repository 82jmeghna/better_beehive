import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'halogen/RingLoader'

export default class BuzzForm extends React.Component {

  styles = {
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
      boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
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

  handleImgChange = (e) => {
    this.setState({ buzz: e.target.src.includes('buzz') })
  }

  handleEmailChange = (e) =>  {
    this.setState({ email: e.target.value })
  }

  handleRelationshipChange = (e) =>  {
    this.setState({ relationship: e.target.value })
  }

  handleReasonChange = (e) =>  {
    this.setState({ reason: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.setState({ emailError: true })
    } else {
      this.setState({ emailError: null, loading: true })
      fetch('reviews',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            review: {
              place_id: this.state.placeId,
              buzz: this.state.buzz ? 'buzz' : 'sting',
              email: this.state.email,
              reason: this.state.reason,
              relationship: this.state.relationship,
            },
          }),
        })
        .then(() => {
          location.assign('spots/' + this.state.placeId)
        })
        .catch((error) => {
          console.error('failure', error) // eslint-disable-line no-console
        })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ margin: '100px auto', width: '32px' }}>
          <Loader color="#26A65B" size="32px" margin="4px"/>
        </div>
      )
    }
    return (
      <form>
        <img
          title="Buzz!"
          onClick={this.handleImgChange}
          src="/assets/transparent_buzz.png"
          style={{ opacity: this.state.buzz ? 1.0 : 0.1 }}
        />
        <img
          title="Sting!"
          onClick={this.handleImgChange}
          src="/assets/transparent_sting.png"
          style={{ opacity: this.state.buzz ? 0.1 : 1.0 }}
        />
        <br />
        { this.state.emailError &&
        <div style={{ color: 'red', marginBottom: '10px' }}>A valid email is required to submit a { this.state.buzz ? 'buzz' : 'sting' }.</div> }
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          style={this.styles.inputElement}
        />
        <br />
        <em>Don't worry, we won't display your email to other users or share it with anyone!</em>
        <br />
        <label>Relationship:</label>
        <select
          value={this.state.relationship}
          onChange={this.handleRelationshipChange}
          style={Object.assign({}, this.styles.inputElement, this.styles.select)}
        >
          <option value="self">Self</option>
          <option value="parent">Parent</option>
          <option value="guardian">Legal Guardian</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label>Why are you leaving a { this.state.buzz ? 'buzz' : 'sting' }?:</label>
        <textarea
          style={Object.assign({}, this.styles.inputElement, this.styles.textArea)}
          value={this.state.reason}
          onChange={this.handleReasonChange}
        >
        </textarea>
        <br />
        <button
          onClick={this.handleSubmit}
          style={this.styles.submit}
        >
          Submit
        </button>
      </form>
    )
  }
}

BuzzForm.propTypes = {
  placeId: PropTypes.string.isRequired,
}
