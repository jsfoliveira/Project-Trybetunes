import React, { Component } from 'react';
import Header from '../Components/Header';

// O constructor é a primeira etapa do ciclo de vida de um componente React. O método super() é passado para informar que queremos reaproveitar o constructor e apenas acrescentar novas coisas após ele.
// O this.state mostra como quero que esteja o  estado inicial.
class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isButtonDisabled: true,
    };
  }

  // O botão  só deve ser habilitado caso o nome digitado tenha 2 ou mais caracteres. O setState vai atualizar o state do isButtonDisabled para um valor do tamanho do artistName para menor que 2.
  validateForm = () => {
    const { artistName } = this.state;
    const minNumber = 2;
    const artistNameValidation = artistName.length < minNumber;
    this.setState({
      isButtonDisabled: artistNameValidation,
    });
  }

  // A cada alteração feita no input, o valor do artistName será validado pela função anterior.
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  render() {
    const { artistName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label
            htmlFor="artistName"
          >
            <input
              id="artistName"
              type="text"
              name="artistName"
              onChange={ this.handleChange }
              value={ artistName }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
