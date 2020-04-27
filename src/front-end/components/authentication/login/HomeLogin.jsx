import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import { Alert } from "react-bootstrap";
import { Value, LoggedIn, LoggedOut } from "@solid/react";

export const HomeMessageComponent = () => {
  const WebId = useWebId();

  return (
    <>
      <LoggedIn data-testid="Logged">
        <h3 data-testid="logged">
          Hola <Value src="user.name" />, has iniciado sesión con este WebID:
        </h3>
        <Alert variant="success">{WebId}</Alert>
      </LoggedIn>
      <LoggedOut data-testid="noLogged">
        <Alert data-testid="noLogged" variant="warning">
          Aún no has iniciado sesión. <a data-testid="noLogged2" href="#/login">Iniciar sesión</a>
        </Alert>
      </LoggedOut>
    </>
  );
};

export default HomeMessageComponent;
