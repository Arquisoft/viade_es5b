import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ProviderItem from "../children/ProviderItem/provider.item.component";
import {
  RegisterWrapper,
  RegisterPanel,
  PanelHeader,
  PanelBody,
  Actions,
} from "./register.style";
import GradientBackground from "../utils/GradientBackground/gradient-background.component";
import CenterContainer from "../utils/CenterContainer/center-container.component";

type Provider = {};

type Register = {
  provider: String,
};

type Props = {
  providers: Array<Provider>,
};

type State = {
  register: Register,
  canContinue: false,
};

class RegisterComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      canContinue: false,
      register: {
        provider: "",
      },
    };
  }

  next = () => {
    const {
      canContinue,
      register: { provider },
    } = this.state;
    const { protocol, host } = window.location;
    if (canContinue) {
      //window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
      window.location = `${provider}?returnToUrl=${protocol}//${host}/viade_es5b/#/`;
    }
  };

  selectProvider = (e) => {
    const { register } = this.state;
    this.setState({
      register: { ...register, provider: e.target.value },
      canContinue: true,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      canContinue,
      register: { provider },
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
      register: { provider },
    } = this.state;
    const { providers } = this.props;

    return (
      <GradientBackground>
        <CenterContainer>
          <RegisterWrapper className="register-wrapper">
            <h1 className="title">Sign up en Viade</h1>
            <form onSubmit={this.onSubmit}>
              <RegisterPanel className="register-panel">
                <PanelHeader className="panel-header">
                  <h2>Selecciona proveedor</h2>
                  <div className="progress-bar" />
                </PanelHeader>
                <PanelBody className="panel-body">
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
                      {providers.map((providerData) => (
                        <ProviderItem
                          className="providerItem"
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
                </PanelBody>
                <Actions className="actions">
                  <button
                    className="btn-solid"
                    onClick={this.next}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Continuar
                  </button>
                </Actions>
              </RegisterPanel>
            </form>
          </RegisterWrapper>
        </CenterContainer>
      </GradientBackground>
    );
  }
}

export { RegisterComponent };
