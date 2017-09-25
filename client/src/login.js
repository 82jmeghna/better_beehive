import React from 'react'
import { Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authAction from './actions/authAction'

class Login extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      credentials: { Email: '', Password: '' },
      isEmpty: false,
      invalidUser: false,
    }
  }

  handleChange = (event) => {
    this.setState({ isEmpty: false, invalidUser: false })
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({ credentials: credentials })
  } 

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.credentials.Email.trim() !== '' || this.state.credentials.Password.trim() !== '') {
      this.props.actions.auth.loginUser(this.state.credentials)
    } else {
      this.setState({ isEmpty: true })
    }
  }

  handleClear = () => {
    this.setState({ credentials: '' })
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.invalidUser) {
      this.setState({ invalidUser: true })
    }
  }

  render()
  {
    return (
      <div>
        <h1 className="main-title">Log In</h1>
          <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalEmail">
                  {this.state.invalidUser &&
                    <div className="col-sm-12" style={{ color: 'red', marginBottom: '10px' }}>
                      Please Enter valid Email or Password
                    </div>
                  }
                  {this.state.isEmpty &&
                    <div className="col-sm-12" style={{ color: 'red', marginBottom: '10px' }}>
                      Please Enter Email and Password
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

              <FormGroup>
                  <Col sm={12}>
                      <Checkbox className="reme_check">Remember me</Checkbox>
                  </Col>
              </FormGroup>

              <FormGroup>
                  <Col sm={12}>
                      <Button type="submit">
                          Sign in
                      </Button>
                  </Col>
              </FormGroup>
              <Link to="/signup">Sign Up</Link>
          </Form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { authReducer } = state
  return {
    invalidUser: authReducer.invalidUser,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(authAction, dispatch),
  },
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
export default connect(mapStateToProps, mapDispatchToProps)(Login)