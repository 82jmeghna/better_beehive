import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
const middleware = applyMiddleware(thunk)
import reducers from './reducers'
const store = createStore(reducers, composeWithDevTools(
  middleware,
))

import Home from './home'
import Spot from './spot'
import Login from './login'
import Signup from './signup'
import Terms from './terms'
import 'style-loader!../styles.css'
import RequireAuth from './requireAuth'


class Main extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={RequireAuth(Login)} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={RequireAuth(Home)} />
            <Route path="/spots/:id" component={RequireAuth(Spot)} />
            <Route path="/terms" component={Terms} />
          </div>
        </Router>
      </div>
    )
  }
}

const renderApp = () => {
  render(
      <Provider store={ store }>
        <Main />
      </Provider>
      , document.getElementById('app'))
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  module.hot.accept()
  renderApp()
}
