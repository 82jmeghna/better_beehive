import React from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
  render() {
    return(
      <div className="footer">
        <Link to="/terms">@Terms and Conditions</Link>
      </div>
    )
  }
}