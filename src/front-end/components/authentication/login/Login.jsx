import React from "react";
import {ProviderLogin} from "@inrupt/solid-react-components";
import Provider from "../../../services/authentication/Proveedor";
import { LoginWrapper, LoginPanel, PanelBody } from "./login.style";
import CenterContainer from "../utils/CenterContainer/center-container.component";

export const LogInComponent = () => {
  return (
    <LoginWrapper data-testid='login-wrapper'>
      <CenterContainer>
        <h1>Login en Viade</h1>
        <LoginPanel className='login-panel'>
          <PanelBody className='panel-body'>
            <ProviderLogin
              className='solid-provider-login-component'
              callbackUri={`${window.location.protocol}//${window.location.host}/viade_es5b/#/`}
              selectPlaceHolder='Seleccione su proveedor'
              inputPlaceholder='Introduza la url de su webId'
              formButtonText='Login'
              btnTxtWebId='Login con el WebId'
              btnTxtProvider='Login con el proveedor'
              errorsText={{
                unknown: 'Algo no va bien, prueba de nuevo...',
                webIdNotValid: 'WebID no es válido',
                emptyProvider: 'Proveedor Solid es necesario',
                emptyWebId: 'WebId es necesario'
              }}
              providers={Provider.getIdentityProviders()}
            />
          </PanelBody>
        </LoginPanel>
      </CenterContainer>
    </LoginWrapper>
  )
}
export default LogInComponent
