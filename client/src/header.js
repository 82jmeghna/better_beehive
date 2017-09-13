import React from 'react'
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
              <NavItem><Link to="/about">ABOUT US</Link></NavItem>
              <NavItem><Link to="/contact">CONTACT US</Link></NavItem>
              <NavItem><Link to="/blog">BLOG</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
          <Nav className="nav-icon">
            <NavItem href="#"><i className="fa fa-search"></i></NavItem>
            <NavItem href="#"><i className="fa fa-twitter"></i></NavItem>
            <NavItem href="#"><i className="fa fa-facebook"></i></NavItem>
          </Nav>
        </Navbar>
    )
  }
}
