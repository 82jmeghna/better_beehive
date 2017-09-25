import React from 'react'
import Radium from 'radium'
import Header from './header'
import Footer from './footer'

@Radium
export default class Spot extends React.Component {
  styles = {
    bbpHeroSection: {
      height: '100%',
      width: 'auto',
      backgroundSize: 'cover',
      marginTop:'180px',
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
          <div style={this.styles.bbpSubSlogan}>Thanks for submitting!</div>
        </div>
        <Footer />
      </div>

    )
  }
}


