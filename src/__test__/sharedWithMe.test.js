import React from 'react'
import ReactDOM from 'react-dom'
import RouteCard from '../front-end/components/ruta/VerRutas/RouteCard'
import Ruta from '../front-end/model/Ruta'
import Hito from '../front-end/model/Hito'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SharedWithMe from '../front-end/components/share/SharedWithMe'

const rutas = []
// Rutas de prueba
const ruta = new Ruta('Ruta Avilés', [4.5, 5.4], 'Muy buena ruta, entretenida.')
const hito1 = new Hito('Niemeyer', 4, 3.2)
const hito2 = new Hito('Parque Ferrera', 4.5, 5.7)
ruta.addHito(hito1)
ruta.addHito(hito2)

console.log('-------------------' + ruta.getHitos().length)
const ruta2 = new Ruta('Ruta Oviedo', [7.5, 8.4], 'Muy buena ruta, entretenida.')
const hito3 = new Hito('Uria', 7.0, 7.5)
const hito4 = new Hito('Catedral', 8.0, 8.3)
ruta.addHito(hito3)
ruta.addHito(hito4)

console.log('-------------------' + ruta.getHitos().length)

rutas.push(ruta)
rutas.push(ruta2)

// NO renderiza los componentes ya que no se puede acceder a backMain por WebId,
// he probado intentando pasar una de prueba pero no ha surtido efecto.

test('Se renderizan bien los componentes de SharePanel', () => {
  afterAll(cleanup)
  const { getByTestId } = render(<SharedWithMe state={rutas} />)
  // let dialogo = await waitForElement(() => getByTestId("componenteModal"));
  expect(getByTestId('rowComp')).toBeTruthy()
  expect(getByTestId('colComp')).toBeTruthy()
  expect(getByTestId('cardComp')).toBeTruthy()
  expect(getByTestId('title')).toHaveTextContent('Compartido conmigo')
  expect(getByTestId('commentbt')).toHaveTextContent('Comentarios')
})
