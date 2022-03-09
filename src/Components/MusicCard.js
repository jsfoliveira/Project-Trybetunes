import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
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
          </div>))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.array.isRequired,
}.isRequired;

export default MusicCard;
