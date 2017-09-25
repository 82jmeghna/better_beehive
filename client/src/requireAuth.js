import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAction from './actions/authAction'

export default function (ComposedComponent) {

  class Authentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object,
    }

    checkValidToken() {
      //check with static token
      //we have to use api for check valid token
      const token = localStorage.getItem('jwt')
      if (this.props.jwt === token) {
        this.props.actions.auth.setAuthenticated(this.props.jwt)
      } else {
        this.props.actions.auth.removeToken()
      }
    }

    componentWillMount() {
      if (!this.props.isAuthenticated && this.props.jwt) {
        this.checkValidToken()
      } else if (!this.props.isAuthenticated && this.props.match.path === '/') {
        return false
      } else if (this.props.isAuthenticated && this.props.match.path === '/') {
        this.context.router.history.push('/home')
      } else if (!this.props.isAuthenticated) {
        this.context.router.history.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated && nextProps.jwt) {
        this.checkValidToken()
      } else if (!nextProps.isAuthenticated && nextProps.match.path === '/') {
        return false
      } else if (nextProps.isAuthenticated && nextProps.match.path === '/') {
        this.context.router.history.push('/home')
      } else if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    const { authReducer } = state
    return {
      isAuthenticated: authReducer.isAuthenticated,
      jwt: authReducer.jwt,
    }
  }

  const mapDispatchToProps = dispatch => ({
    actions: {
      auth: bindActionCreators(authAction, dispatch),
    },
  })

  return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}
