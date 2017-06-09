import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
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
          Buzz & Sting to help create a disability-friendly world yoyo.
        </div>
        <Search />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Main />,
    document.getElementById('app'),
  )
})

if (module.hot) {

}
