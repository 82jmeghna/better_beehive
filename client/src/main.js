import React from 'react'
import { render } from 'react-dom'
import Search from './Search'

class Main extends React.Component {
  styles = {

  }

  render() {
    return (
      <div>
        <div>
          Bee the Change in Our Community.
        </div>
        <div>
          Buzz & Sting to help create a disability-friendly world.
        </div>
        <Search />
      </div>
    )
  }
}

const renderApp = () => {
  render(
    <Main />,
    document.getElementById('app'),
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
})

if (module.hot) {
  module.hot.accept()
  renderApp()
}
