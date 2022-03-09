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
    this.setState({
      music: fullAlbum[0],
      loading: false,
    });
    const musics = fullAlbum.filter((obj) => obj.kind === 'song');
    this.setState({ completeAlbum: musics });
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
