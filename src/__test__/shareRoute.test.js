import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import AmigoService from "../__test__/__mocks__/AmigoService"
import { render, cleanup, waitForElement, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SharePanel from "../front-end/components/share/SharePanel";
import createReactMock from 'react-mock-component';
import CommentBox from '../front-end/components/share/CommentBox'

// Rutas de prueba
let ruta=new Ruta("Ruta Avilés", [43.534401, -5.909476], "Genial");
let hito1 = new Hito("Niemeyer", 4, 3.2);
let hito2 = new Hito("Parque Ferrera", 4.5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);

console.log('-------------------' + ruta.getHitos().length)

let amigoService = new AmigoService();


//Lista de amigos de prueba:
// Rutas de prueba


  const amigo2 = new Amigo(
    'Alex',
    'https://hamalawindows.solid.community/profile/card#me'
  )

/*test("RouteCard contiene el botón de compartir.", () => {
    afterAll(cleanup);
    jest.mock("../__test__/__mocks__/solid-auth-client.js");
    const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
    const bts = getAllByTestId("rb-compartir");
});*/
test("Se renderizan bien los componentes de SharePanel", () => {
    afterAll(cleanup);
    const { getByTestId } = render(<SharePanel ruta={ruta} getAmigos={amigoService.getAmigos} show="true"></SharePanel>);
   
    expect(getByTestId("componenteModal")).toBeTruthy();
    expect(getByTestId("titleCompartir")).toHaveTextContent("Compartir esta ruta");
    expect(getByTestId("nombreRutaCompartir")).toHaveTextContent("Ruta: "+ruta.getNombre());
    expect(getByTestId("parrafoSeleccion")).toHaveTextContent("Selecciona a los amigos con los que deseas compartir esta ruta:");
    expect(getByTestId("cancelarCompartirButton")).toHaveTextContent("Cancelar");
    expect(getByTestId("compartirButton")).toHaveTextContent("Compartir");
});


test("Se renderizan bien los componentes de SharePanel, escogemos amigos y compartimos la ruta", async () => {
  afterAll(cleanup);
  const { getByTestId,getAllByTestId } = render(<SharePanel ruta={ruta} getAmigos={amigoService.getAmigos} show={true} shareRuta={()=>{}} cancel={()=>{}}></SharePanel>);
  expect(getByTestId("titleCompartir")).toHaveTextContent("Compartir esta ruta");
  expect(getByTestId("nombreRutaCompartir")).toHaveTextContent("Ruta: "+ruta.getNombre());
  expect(getByTestId("parrafoSeleccion")).toHaveTextContent("Selecciona a los amigos con los que deseas compartir esta ruta:");
  let amigos = await waitForElement(() => getAllByTestId("itemLista"));
  expect(getByTestId("cancelarCompartirButton")).toHaveTextContent("Cancelar");
  expect(getByTestId("compartirButton")).toHaveTextContent("Compartir");
  expect(getByTestId("envoltorio").children.length).toBe(3);
  
  var elementos=getAllByTestId("itemLista");
  for (var e in elementos){
    elementos[e].click();
  }
  getByTestId("compartirButton").click();
 
});	

test("Se renderizan bien los componentes de SharePanel, seleccionamos y quitamos de la selección a amigos ", async () => {
  afterAll(cleanup);
  const { getByTestId,getAllByTestId } = render(<SharePanel ruta={ruta} getAmigos={amigoService.getAmigos} show={true} shareRuta={()=>{}} cancel={()=>{}}></SharePanel>);
  expect(getByTestId("titleCompartir")).toHaveTextContent("Compartir esta ruta");
  expect(getByTestId("nombreRutaCompartir")).toHaveTextContent("Ruta: "+ruta.getNombre());
  expect(getByTestId("parrafoSeleccion")).toHaveTextContent("Selecciona a los amigos con los que deseas compartir esta ruta:");
  let amigos = await waitForElement(() => getAllByTestId("itemLista"));
  expect(getByTestId("cancelarCompartirButton")).toHaveTextContent("Cancelar");
  expect(getByTestId("compartirButton")).toHaveTextContent("Compartir");
  expect(getByTestId("envoltorio").children.length).toBe(3);
  
  var elementos=getAllByTestId("itemLista");
  for (var e in elementos){
    elementos[e].click();
  }
  for (var e in elementos){
    elementos[e].click();
  }
  getByTestId("cancelarCompartirButton").click();
 
});	

test('Se renderizan bien los componentes de SharePanel al pinchar en el botón de -compartir-', () => {
  afterAll(cleanup)
  jest.mock('../__test__/__mocks__/solid-auth-client.js')
  const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta} />)
  const bts = getAllByTestId('rb-compartir')
  bts[0].click()
  // let dialogo = await waitForElement(() => getByTestId("componenteModal"));
  expect(getByTestId('componenteModal')).toBeTruthy()
  expect(getByTestId('titleCompartir')).toHaveTextContent('Compartir esta ruta')
  expect(getByTestId('nombreRutaCompartir')).toHaveTextContent('Ruta: ' + ruta.getNombre())
  expect(getByTestId('parrafoSeleccion')).toHaveTextContent('Selecciona a los amigos con los que deseas compartir esta ruta:')
  expect(getByTestId('cancelarCompartirButton')).toHaveTextContent('Cancelar')
  expect(getByTestId('compartirButton')).toHaveTextContent('Compartir')
})

