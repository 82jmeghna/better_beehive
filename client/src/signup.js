import React from 'react'
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class Signup extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      credentials: { Email: '', Username: '', Password: '', ConfirmPassword: '' },
      isEmpty: false,
      invalidPassword: false,
    }
  }

  handleChange = (event) => {
    this.setState({ isEmpty: false, invalidPassword: false })
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({ credentials: credentials })
  }

  handleClear = () => {
    this.setState({ credentials: '' })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (
        !this.state.credentials.Email.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      this.setState({ emailError: true })
    }
    else if(this.state.credentials.Password !== this.state.credentials.ConfirmPassword){
      this.setState({ passwordError: true })
    }
    else if (this.state.credentials.Email.trim() !== '' || this.state.credentials.Username.trim() !== '' || this.state.credentials.Password.trim() !== '') {
      this.setState({ emailError: null, passwordError:null, loading: true })
      fetch('auth/saveuser', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          login: {
            email:this.state.credentials.Email,
            username:this.state.credentials.Username,
            password:this.state.credentials.Password,
          },
        }),
      })
        .then(() => {
          this.setState({ loading: false, redirect: true })
        })
        .catch(error => {
          console.error('failure', error) // eslint-disable-line no-console
        })
    } else {
      this.setState({ isEmpty: true })
    }
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
    }

    return (
        <div>
          <h1 className="main-title">Sign Up</h1>
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Username
                    </Col>
                    <Col sm={12}>
                        <FormControl
                            name="Username"
                            type="text"
                            value={this.state.credentials.Username}
                            placeholder="Username"
                            onChange={ this.handleChange }
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  {this.state.emailError &&
                    <div className="col-sm-12" style={{ color: 'red', marginBottom: '10px' }}>
                     Please Enter Valid Email
                    </div>
                  }
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={12}>
                        <FormControl
                            name="Email"
                            type="text"
                            value={this.state.credentials.Email}
                            placeholder="Email"
                            onChange={ this.handleChange }
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={12}>
                        <FormControl
                            name="Password"
                            type="password"
                            value={this.state.credentials.Password}
                            placeholder="Password"
                            onChange={ this.handleChange }
                        />
                    </Col>
                </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                {this.state.passwordError &&
                <div className="col-sm-12" style={{ color: 'red', marginBottom: '10px' }}>
                  Please Enter Valid Password
                </div>
                }
                <Col componentClass={ControlLabel} sm={12}>
                  Confirm Password
                </Col>
                <Col sm={12}>
                  <FormControl
                    name="ConfirmPassword"
                    type="password"
                    value={this.state.credentials.ConfirmPassword}
                    placeholder="Confirm Password"
                    onChange={ this.handleChange }
                  />
                </Col>
              </FormGroup>

                <FormGroup>
                    <Col sm={12}>
                        <Button type="submit">
                            Sign Up
                        </Button>
                    </Col>
                </FormGroup>
              <Link to="/">Log In</Link>
            </Form>
        </div>
    )
  }
}