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

  handleChange = (address) => {
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
    autocompleteBox: {
      root: {
        width: '500px',
        marginTop: '40px',
      },
      input: {
        background: 'white',
        width: '500px',
        height: '50px',
        padding: '10px 10px',
        color: 'black',
      },
    },
  }

  render() {
    const inputProps = {
      value:       this.state.address,
      onChange:    this.handleChange,
      type:        'search',
      placeholder: 'Begin typing business name or address..',
      autoFocus:   true,
    }

    // const cssClasses = {
    //   root:  'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
    //   input: 'mdl-textfield__input',
    //   autocompleteContainer: 'autocomplete-container',
    // }

    return (
      <div style={{ marginBottom: '100px' }}>
        <PlacesAutocomplete
          inputProps={inputProps}
          styles={this.styles.autocompleteBox}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleEnter}
        />
        {
          this.state.searchClicked && <BuzzForm placeId={this.state.placeId} />
        }
      </div>
    )
  }
}
