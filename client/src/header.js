import React from 'react'
import Radium from 'radium'
import * as headerLogo from '../images/header-logo.png'

@Radium
export default class Header extends React.Component {
  styles = {
    header: {
      position: 'fixed',
      zIndex: '100',
      backgroundColor: 'rgba(255, 255, 255, 0.87)',
      width: '100%',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    headerLogo: {
      height: '130px',
      marginTop: '-15px',
    },
    navGroup: {
      marginTop: '39px',
      width: '508px',
    },
    navigationLink: {
      textTransform: 'uppercase',
      fontWeight: '900',
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
      fontSize: '18px',
      padding: '25px',
      ':hover': {
        cursor: 'pointer',
        borderBottom: '2px solid',
      },
    },
  }

  render() {
    return (
      <header style={this.styles.header}>
        <div style={this.styles.headerContainer}>
          <img style={this.styles.headerLogo} src={headerLogo.default} />
          <nav style={this.styles.navGroup} />
          <div style={{ width: '131px' }} />
        </div>
      </header>
    )
  }
}
