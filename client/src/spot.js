import React from 'react'
import Radium from 'radium'

@Radium
export default class Spot extends React.Component {
  styles = {
    bbpHeroSection: {
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
        <div style={this.styles.bbpSubSlogan}>Thanks for submitting!</div>
      </div>
    )
  }
}
