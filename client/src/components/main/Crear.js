import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="body scroll-container pt-3 pb-3">
        <Link to="#{}"></Link>
      </div>
    );
  }
}

export default Landing;
