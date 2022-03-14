import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      music: {},
      completeAlbum: [],
    };
  }

  // Ao entrar na página, foi feita uma requisição utilizando a função getMusics do arquivo musicsAPI.js, essa função recebe o id.
  componentDidMount() {
    this.fetchMusic();
  }

  async fetchMusic() {
    const { match: { params: { id } } } = this.props;
    const fullAlbum = await getMusics(id);
    // A constante fullAlbum é um array de objetos, que todos os álbuns. O primeiro elemento do fullAlbum[0] vai ser um objeto mais geral do álbum, por isso que ele ficará nesse Componente Album, o console.log aparece algo do tipo: 
    // 0: {wrapperType: 'collection', collectionType: 'Album', artist.....}
    // O musics vai retornar só os elementos a partir do 1, ou seja fullAlbum[1] até o final, nesses elementos contém mais as informações da música que é clicada para ouvir, por isso que  coloquei ele no MusicCard. O obj.kind === 'song' é uma informação que está em todos os elementos desse array, menos o fullAlbum, que é isso que eu quero pegar no musics.Se fizer um console.log em musics, vai aparecer algo do tipo:
    // 1: {wrapperType: 'track', kind: 'song', artistId: 471744, ...} 
    // Eu peguei essa ideia de botar [0] em uma mentoria de Lua. 
    const musics = fullAlbum.filter((obj) => obj.kind === 'song');
    console.log(fullAlbum);
    console.log(fullAlbum[0]);
    console.log(musics);
    this.setState({
      completeAlbum: musics,
      music: fullAlbum[0],
      loading: false,
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { loading, music, completeAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>
          {id}
        </p>
        <p data-testid="artist-name">{ music.artistName }</p>
        <p data-testid="album-name">{ music.collectionName }</p>

        {
          loading ? <Loading /> : (<MusicCard musics={ completeAlbum } />)
        }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
