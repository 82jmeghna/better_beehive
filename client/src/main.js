import React from 'react'
import { render } from 'react-dom'
import Radium from 'radium'
import Header from './Header'
import Search from './Search'
import 'style-loader!../styles.css'

@Radium
class Main extends React.Component {
  styles = {
    bbpHeroSection: {
      position: 'relative',
      height: '100%',
      width: 'auto',
      backgroundSize: 'cover',
      lineHeight: '1em',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bbpSlogan: {
      fontSize: '60px',
      paddingTop: '160px',
      lineHeight: '1em',
    },
    bbpSubSlogan: {
      fontSize: '21px',
      paddingTop: '24px',
      lineHeight: '1em',
    },
  }

  render() {
    return (
      <div>
        <Header />
        <div style={this.styles.bbpHeroSection}>
          <div>
            <h1 style={this.styles.bbpSlogan}>
              Bee the Change in Our Community.
            </h1>
          </div>
          <div style={this.styles.bbpSubSlogan}>
            Buzz & Sting to help create a disability-friendly world.
          </div>
          <div>
            <Search />
          </div>
        </div>
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
