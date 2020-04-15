import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddRutaMap from "../front-end/components/ruta/AñadirRuta/AddRutaMap";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "../enzyme";
import { Tooltip, Overlay, Spinner } from "react-bootstrap";

test("Se renderiza correctamente", () => {
  let div = document.createElement("div");
  ReactDOM.render(<AddRutaMap showMap={false} />, div);
});

test("Se muestran los inputs para el nombre y la descripción vacíos", () => {
  const testRenderer = TestRenderer.create(<AddRutaMap showMap={false} />);
  const testInstance = testRenderer.root;

  expect(
    testInstance.findByProps({ testid: "input-nombre" }).props.value
  ).toEqual("");

  expect(
    testInstance.findByProps({ testid: "input-descripcion" }).props.value
  ).toEqual("");
});

test("Campo del nombre vacío -> se muestra el tooltip", () => {
  const mockScroll = jest.fn();

  const wrapper = shallow(
    <AddRutaMap handleScrollIntoView={mockScroll} showMap={false} />
  );
  let button = wrapper.find({ testid: "boton-agregar" });

  expect(button.text()).toEqual("Agregar");
  button.simulate("click");
  expect(mockScroll.mock.calls.length).toEqual(1);
  expect(wrapper.find(Overlay).get(0).props.show).toEqual(true);
  expect(wrapper.find(Overlay).get(1).props.show).toEqual(false);
  expect(wrapper.find(Overlay).get(2).props.show).toEqual(false);
});

test("Campo de la descripción vacío -> se muestra el tooltip", () => {
  const mockScroll = jest.fn();
  const wrapper = shallow(
    <AddRutaMap showMap={false} handleScrollIntoView={mockScroll} />
  );
  // Rellenamos el campo de nombre
  let inputNombre = wrapper.find({ testid: "input-nombre" });
  inputNombre.simulate("change", { target: { value: "Nombre de prueba" } });

  let button = wrapper.find({ testid: "boton-agregar" });
  expect(button.text()).toEqual("Agregar");
  button.simulate("click");
  expect(mockScroll.mock.calls.length).toEqual(1);
  expect(wrapper.find(Overlay).get(0).props.show).toEqual(false);
  expect(wrapper.find(Overlay).get(1).props.show).toEqual(true);
  expect(wrapper.find(Overlay).get(2).props.show).toEqual(false);
});

test("No hay al menos dos puntos seleccionados -> se muestra el tooltip", () => {
  const mockScroll = jest.fn();
  const wrapper = shallow(
    <AddRutaMap showMap={false} handleScrollIntoView={mockScroll} />
  );
  // Rellenamos el campo de nombre y de descripción
  let inputNombre = wrapper.find({ testid: "input-nombre" });
  inputNombre.simulate("change", { target: { value: "Nombre de prueba" } });

  let inputDes = wrapper.find({ testid: "input-descripcion" });
  inputDes.simulate("change", { target: { value: "Descripción de prueba" } });

  let button = wrapper.find({ testid: "boton-agregar" });
  expect(button.text()).toEqual("Agregar");
  button.simulate("click");

  expect(mockScroll.mock.calls.length).toEqual(1);
  expect(wrapper.find(Overlay).get(0).props.show).toEqual(false);
  expect(wrapper.find(Overlay).get(1).props.show).toEqual(false);
  expect(wrapper.find(Overlay).get(2).props.show).toEqual(true);
});
