import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REQUISITO 8: o favorite inicialmente deve estar false, ou seja, o checkbox não está checked.
// Eu tive ajuda na mentoria. Percebi que precisaria criar esse outro Componente. Tive muita dificuldade para criar esse requisito 8.
class Input extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.favorite();
  }

  // REQUISITO 8: eu precisei fazer uma função fora para quando o checkbox for checked, o state do favorite fique true, isso quer dizer que. Usei nessa função as props criadas no componente MusicCard.
  favorite = () => {
    const { favs, music } = this.props;
    favs.forEach((e) => {
      if (e.trackId === music.trackId) {
        this.setState(
          { favorite: true },
        );
      }
    });
  };

  handleChange = ({ target }) => {
    const { savingMusics, music } = this.props;
    const { name, checked } = target;
    this.setState({
      [name]: checked,
    }, () => savingMusics(checked, music));
  }

  render() {
    const { favorite } = this.state;
    const { music } = this.props;
    return (
      <div>
        <label htmlFor="favorites">
          <input
            id="favorites"
            name="favorites"
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.handleChange }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}
Input.propTypes = {
  music: PropTypes.obj,
}.isRequired;

export default Input;
