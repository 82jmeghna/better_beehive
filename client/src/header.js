import  React from 'react'
import Radium from 'radium'
import { Link } from 'react-router-dom'
import * as headerLogo from '../images/main-logo.png'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

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

    navGroup: {
      marginTop: '39px',
      width: '508px',
    },
    navigationListItem: {
      listStyle: 'none',
      float: 'left',
      display: 'block',
    },
    navbarBrand: {
      float: 'none',
    },
    navbarHeader: {
      float:'none',
      display: 'inline-block',
    },
    navbarNav: {
      float:'none',
      display: 'inline-block',
    },
    mainnav: {
      backgroundColor:'#fff',
      border: '0',
    },
  }

  render() {
    return (
        <Navbar style={this.styles.mainnav} fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'} style={this.styles.navbarBrand}>
                <img style={this.styles.headerLogo} src={headerLogo.default} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="navlink">
              <NavItem><Link to="/">HOME</Link></NavItem>
              <a href="http://betterthehive.com/" target="_blank">ABOUT US</a>
              <a href="http://betterthehive.com/contact-us/" target="_blank">CONTACT US</a>
              <a href="http://betterthehive.com/about-us/blog/" target="_blank">BLOG</a>
            </Nav>
          </Navbar.Collapse>
          <Nav className="nav-icon">
            <a href="http://betterthehive.com/" target="_blank"><i className="fa fa-search"></i></a>
            <a href="https://twitter.com/BetterBeehive" target="_blank"><i className="fa fa-twitter"></i></a>
            <a href="https://www.facebook.com/betterbeehiveproject/?ref=bookmarks" target="_blank"><i className="fa fa-facebook"></i></a>
            <NavItem className="pull-right"><Link to="/">Log Out</Link></NavItem>
          </Nav>
        </Navbar>
    )
  }
}
