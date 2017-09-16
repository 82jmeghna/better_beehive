import React from 'react'
import Radium from 'radium'
import Search from './search'
import * as Buzz from '../images/buzz.png'
import * as Sting from '../images/sting.png'

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
      fontSize: '50px',
      paddingTop: '60px',
      lineHeight: '1em',
      fontWeight: '600',
      marginTop: '120px',
      color: '#A094F9',
      fontFamily: 'Montserrat',
    },
    bbpSubSlogan: {
      fontSize: '21px',
      paddingTop: '24px',
      lineHeight: '1em',
    },

    headerImg: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  render() {
    return (
      <div className="body-main" style={this.styles.bbpHeroSection}>
        <div>
          <div className="col-sm-6 col-sm-offset-3 text-center">
          <h1 style={this.styles.bbpSlogan}>
            Bee the Change
          </h1>
            <div style={this.styles.inputGroup}>
              <div className="img-container" style={this.styles.headerImg}>
                <div>
                <img
                  title="Buzz!"
                  onClick={this.handleImgChange}
                  src={Buzz.default}
                />
                </div>
                <h3 className="img-text or-text">or</h3>
                <div>
                <img
                  title="Sting!"
                  onClick={this.handleImgChange}
                  src={Sting.default}
                />
                </div>
              </div>
              <h3>Share your journey to create a disability-friendly world</h3>
            </div>
          </div>
        </div>

        <div>
          <Search />
        </div>
      </div>
    )
  }
}
