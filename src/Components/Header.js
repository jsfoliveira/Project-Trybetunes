import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchName();
  }

  async fetchName() {
    const result = await getUser();
    this.setState({
      loading: false,
      user: result.name,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {(loading === true) ? <Loading /> : (
          <div>
            <p
              data-testid="header-user-name"
            >
              {user}
            </p>
            <ul>
              <li>
                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    );
  }
}
export default Header;
