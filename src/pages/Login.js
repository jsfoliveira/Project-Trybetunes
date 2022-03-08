import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

// O constructor é a primeira etapa do ciclo de vida de um componente React. O método super() é passado para informar que queremos reaproveitar o constructor e apenas acrescentar novas coisas após ele.
// O this.state mostra como quero que esteja o  estado inicial.
class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoginButtonDisabled: true,
      loading: false,
      isLoggedIn: false,
    };
  }

  // O botão para entrar só deve ser habilitado caso o nome digitado tenha 3 ou mais caracteres. O setState vai atualizar o state do isLoginButtonDisabled para um valor do tamanho do name para menor que 3.
  validateForm = () => {
    const { name } = this.state;
    const minNumber = 3;
    const nameValidation = name.length >= minNumber;
    this.setState({
      isLoginButtonDisabled: nameValidation === false,
    });
  }

  // A cada alteração feita no input, o valor do name será validado pela função anterior.
  loginChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  // A cada click no botão, o loading vai ser atualizado para true, como também gerará uma função assíncrona. O createUser({name}) é a promisse, vai conferir se o name confere com a promisse e vai tornar o isLoggedIn true.
  // Segui a sintaxe do exercício do course.
  loginClick = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name })
        .then(() => {
          this.setState({
            isLoggedIn: true,
          });
        });
    });
  }

  render() {
    const { name, isLoginButtonDisabled, loading, isLoggedIn } = this.state;
    // Se o loading for true, quer dizer que o name condiz com os dados da promisse, então vai liberar o acesso, vai redicionar para a página /search; caso contrário, irá renderizar o <Loading>
    // Eu aprendi sobre o <Redirect> nesse site: v5-reactrouter-com.
    if (loading === true) {
      return isLoggedIn ? <Redirect to="/search" /> : <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor='"name'>
            Nome
            <input
              id="name"
              type="text"
              name="name"
              onChange={ this.loginChange }
              value={ name }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            onClick={ this.loginClick }
            disabled={ isLoginButtonDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
