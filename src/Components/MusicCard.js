import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import Input from './input';

// REQUISITO 8: O state inicial é aparecer a mensagem 'carregando...' e o array de objeto vazio (que vai guardar o conjunto de produtos checked).
class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      checked: [],
    };
  }

  // REQUISITO 9
  async componentDidMount() {
    await this.takingStorage();
    this.setState({
      loading: false,
    });
  }

  // REQUISITO 9
  takingStorage = async () => {
    const musicFavorites = await getFavoriteSongs();
    this.setState({
      checked: musicFavorites,
    });
  }

  // REQUISITO 8: Criei uma função para salvar a músicas checkeds. O state é atulizado para true e acontece a seguinte função assíncrona. Se a música estiver marcada, a função async vai receber a promisse addSong, que já está definida no favoriteSongsAPI. Também receberá outra promisse chamada getFavoriteSongs(), essa contém as músicas favoritadas, atribui ela ao checked, isso tudo deve acontecer quando o loading é false, que é quando é possível clicar no checkbox.
  saveMusic = (marked, song) => {
    this.setState({
      loading: true,
    },
    async () => {
      if (marked === true) {
        await addSong(song);
        const favorite = await getFavoriteSongs();
        this.setState({
          checked: favorite,
        });
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { musics } = this.props;
    const { loading, checked } = this.state;
    return (loading === true) ? <Loading />
      : (
        <div>
          {musics.map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>

              <Input
                music={ music }
                savingMusics={ this.saveMusic }
                favs={ checked }
              />
            </div>))}
        </div>
      );
  }
}
MusicCard.propTypes = {
  musics: PropTypes.array,
}.isRequired;
export default MusicCard;
