import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;

    return (
      <div>
        <h3>{album.collectionName}</h3>
        <p>{ album.artistName }</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          Álbum
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AlbumCard;
