import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header
        data-testid="header-component"
      >
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </ul>
      </header>

    );
  }
}

export default Header;
