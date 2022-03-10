import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addSong from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  // async saveMusic() {
  //   await addSong();
  //   this.setState({
  //     loading: false,
  //   });
  // }

  render() {
    const { musics, loading } = this.props;
    return (
      loading ? <loading /> : (
        <div>
          {musics.map((element) => (
            <div key={ element.trackId }>
              <h4>{element.trackName}</h4>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favorites">
                <input
                  id="favorites"
                  type="checkbox"
                  value={ element.trackId }
                  onClick={ this.saveMusic }
                  data-testid={ `checkbox-music-${element.trackId}` }
                />
                Favorita
              </label>
            </div>))}
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.array.isRequired,
}.isRequired;

export default MusicCard;
