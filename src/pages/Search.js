import React, { Component } from 'react';
import Header from '../Components/Header';
import AlbumCard from './AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

// O constructor é a primeira etapa do ciclo de vida de um componente React. O método super() é passado para informar que queremos reaproveitar o constructor e apenas acrescentar novas coisas após ele.
// O this.state mostra como quero que esteja o  estado inicial.
class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isButtonDisabled: true,
      artistSearched: '',
      loading: false,
      listAlbum: [],
    };
  }

  // REQUISITO 6: A promisse é a searchAlbumsAPI, quero buscar por artistName (que é uma variável já determinada no arquivo searchAlbumsAPI.js). Se eu fizer o console.log do albuns, vai aparecer um array de objetos dos álbuns do artista. Dentro dela altero a state inicial, para que quando carregada a página, o loading seja false, o artistName fique vazio, artistSearched receba o artistName e listAlbum receba albuns.
  async handleClick(event) {
    event.preventDefault();
    const { artistName } = this.state;

    const albuns = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      loading: false,
      artistSearched: artistName,
      listAlbum: albuns,
    });
  }

// REQUISITO 5: O botão só deve ser habilitado caso o nome digitado tenha 2 ou mais caracteres. O setState vai atualizar o state do isButtonDisabled para um valor do tamanho do artistName para menor que 2.
validateForm = () => {
  const { artistName } = this.state;
  const minNumber = 2;
  const artistNameValidation = artistName.length < minNumber;
  this.setState({
    isButtonDisabled: artistNameValidation,
  });
}

  // REQUISITO 5: A cada alteração feita no input, o valor do artistName será validado pela função anterior.
  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    }, this.validateForm);
  }

  render() {
    const { artistName, artistSearched, listAlbum,
      isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* Enquanto aguarda a resposta da API, esconda o input e o botão de pesquisa e exiba a mensagem Carregando... na tela. */}
        {loading
          ? <Loading />
          : (
            <div>
              <form>
                <input
                  type="text"
                  onChange={ this.handleChange }
                  value={ artistName }
                  data-testid="search-artist-input"
                />
                <button
                  type="submit"
                  disabled={ isButtonDisabled }
                  data-testid="search-artist-button"
                  onClick={ (event) => this.handleClick(event) }
                >
                  Pesquisar
                </button>
              </form>
              {/* REQUISITO 6: Será validado se ao clicar no botão, o texto Resultado de álbuns de: <artista> aparece na tela. */}
              {artistSearched && (
                <p>
                  {`Resultado de álbuns de: ${artistSearched}`}
                </p>
              )}
              {/* REQUISITO 6: Se o listAlbum estiver vazio, retorne o parágrafo; caso contrário,  crie um novo array contendo o que está sendo pedido no <AlbumCard> */}
              {listAlbum.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div>
                    {listAlbum.map(
                      (album) => <AlbumCard album={ album } key={ album.collectionId } />,
                    )}
                  </div>
                )}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
