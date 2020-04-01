import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import { Alert } from "react-bootstrap";

export const HomeMessageComponent = () => {
  const WebId = useWebId();

  return (
    <>
      {WebId ? (
        <>
          <h3>Sesión iniciada</h3>
          <Alert variant="success">
            <b>WebID: </b>
            {WebId}
          </Alert>
        </>
      ) : (
        <>
          <Alert variant="warning">
            Aún no has iniciado sesión. <a href="#/login">Iniciar sesión</a>
          </Alert>
        </>
      )}
    </>
  );
};

export default HomeMessageComponent;
