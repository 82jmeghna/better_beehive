import React from 'react'
import Radium from 'radium'
import PlacesAutocomplete from 'react-places-autocomplete'
import BuzzForm from './form'

@Radium
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', searchClicked: false }
  }

  handleChange = address => {
    this.setState({ address })
  }


  handleSelect = (address, placeId) => {
    this.setState({ address, placeId })
    this.setState({ searchClicked: true })
  }

  handleEnter = () => {
    this.setState({ searchClicked: true })
  }

  styles = {
    autocompleteDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
    autocompleteBox: {
      root: {
        width: '500px',
        marginTop: '10px',
      },
      input: {
        backgroundColor: '#fafafa',
        width: '100%',
        padding: '15px 10px',
        color: 'black',
        border: '1px solid rgba(0,0,0, 0.12)',
        fontSize: '16px',
        fontFamily: '"Helvetica", "Arial", sans-serif',
        ':focus': {
          outline: 'none',
        },
      },
      autocompleteContainer: {
        zIndex: '99999999999',
      },
    },
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleChange,
      type: 'search',
      placeholder: 'Begin typing business name or address..',
      autoFocus: true,
    }

    // const cssClasses = {
    //   root:  'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
    //   input: 'mdl-textfield__input',
    //   autocompleteContainer: 'autocomplete-container',
    // }

    return (
      <div style={{ paddingBottom:'50px' }}>
        <div style={this.styles.autocompleteDiv} className="txt-center">
          <PlacesAutocomplete
            inputProps={inputProps}
            styles={this.styles.autocompleteBox}
            onSelect={this.handleSelect}
            onEnterKeyDown={this.handleEnter}
          />
        </div>
        {this.state.searchClicked &&
          <div>
            <BuzzForm placeId={this.state.placeId} address={this.state.address}/>
          </div>}
      </div>
    )
  }
}
