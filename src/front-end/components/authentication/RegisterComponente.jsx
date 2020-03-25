import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ProviderItem from "./children/ProviderItem/provider.item.component";

type Provider = {};

type Register = {
  provider: String
};

type Props = {
  providers: Array<Provider>
};

type State = {
  register: Register,
  canContinue: false
};

class RegisterComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      canContinue: false,
      register: {
        provider: ""
      }
    };
  }

  next = () => {
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { protocol, host } = window.location;
    if (canContinue) {
      //window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
      window.location = `${provider}?returnToUrl=${protocol}//${host}/viade_es5b`;
    }
  };

  selectProvider = e => {
    const { register } = this.state;
    this.setState({
      register: { ...register, provider: e.target.value },
      canContinue: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { protocol, host } = window.location;
    if (canContinue) {
      //window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
      window.location = `${provider}?returnToUrl=${protocol}//${host}/viade_es5b`;
    }
  };

  render() {
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { providers } = this.props;

    return (
      <div>
        <h1>Sign up en Viade</h1>
        <form onSubmit={this.onSubmit}>
          <h2>Selecciona proveedor</h2>
          <div className="progress-bar" />
          <Fragment>
            <a
              href="https://solid.inrupt.com/how-it-works"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Que es un proveedor?
            </a>
            <Link to="/login" className="a-with-spacing">
              LogIn
            </Link>
            <ul>
              {providers.map(providerData => (
                <ProviderItem
                  data={providerData}
                  key={providerData.id}
                  onSelect={this.selectProvider}
                  radioName="providerRadio"
                  id={`radio-${providerData.id}`}
                  checked={providerData.registerLink === provider}
                />
              ))}
            </ul>
          </Fragment>
          <button
            className="btn-solid"
            onClick={this.next}
            type="submit"
            disabled={!canContinue}
          >
            Continuar
          </button>
        </form>
      </div>
    );
  }
}

export { RegisterComponent };
