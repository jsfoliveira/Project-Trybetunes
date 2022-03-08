import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  // O constructor é a primeira etapa do ciclo de vida de um componente React.
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }
  // A segunda etapa do ciclo de vida é o componentDidMount().  Ela é rodada uma única vez, assim que o componente aparece na tela. Coloquei dentro dela a função assíncrona fetchName.

  componentDidMount() {
    this.fetchName();
  }
  // A promisse é o getUser, dentro dela altero a state inicial, para que quando carregada a página, o loading seja false e o user receba os dados da promisse.

  async fetchName() {
    const result = await getUser();
    this.setState({
      loading: false,
      user: result.name,
    });
  }

  // Se o loading for true, return <Loading />; caso contrário, retorne o conteúdo do <header>.
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
