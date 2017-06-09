import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete from 'react-places-autocomplete'
import BuzzForm from './form'

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
    this.setState({searchClicked: true})
  }

  handleEnter = () => {
    this.setState({searchClicked: true})
  }

  render() {
    const inputProps = {
      value:       this.state.address,
      onChange:    this.handleChange,
      type:        'search',
      placeholder: 'Begin typing business name or address..',
      autoFocus:   true,
    }

    const cssClasses = {
      root:  'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
      input: 'mdl-textfield__input',
      autocompleteContainer: 'autocomplete-container'
    }

    return (
      <div style={{ marginBottom: '100px' }}>
      <PlacesAutocomplete
        inputProps={inputProps}
        classNames={cssClasses}
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
