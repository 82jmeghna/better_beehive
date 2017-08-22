import React from 'react'
import Radium from 'radium'
import Search from './Search'

@Radium
export default class Home extends React.Component {
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
    )
  }
}
