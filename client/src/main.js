import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Spot from './Spot'
import 'style-loader!../styles.css'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/spots/:id" component={Spot} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const renderApp = () => {
  render(<Main />, document.getElementById('app'))
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  module.hot.accept()
  renderApp()
}
