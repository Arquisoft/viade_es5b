import React from 'react'
import ReactDOM from 'react-dom'
import RouteList from '../front-end/components/ruta/VerRutas/RouteList'
import Ruta from '../front-end/model/Ruta'
import Hito from '../front-end/model/Hito'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'

// Rutas de prueba
const rutas = []
function setUp () {
  const ruta1 = new Ruta(
    'Ruta Avilés',
    [4.5, 5.4],
    'Muy buena ruta, entretenida.'
  )
  const hito11 = new Hito('Niemeyer', 4, 3.2)
  const hito21 = new Hito('Parque Ferrera', 5, 5.7)
  ruta1.addHito(hito11)
  ruta1.addHito(hito21)

  const ruta2 = new Ruta('Ruta Candás', [5.6, 5.2], 'Me encanta Candás.')
  const hito12 = new Hito('Río de Candás', 4.1, 3.3)
  const hito22 = new Hito('Parque Ferrera', 5, 3.22)
  ruta2.addHito(hito12)
  ruta2.addHito(hito22)

  rutas.push(ruta1)
  rutas.push(ruta2)
}

test('Componente se renderiza sin crahsear.', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RouteList rutas={[]} />, div)
})

test('No hay rutas, se muestra la alerta correspondiente.', async () => {
  const { getByTestId } = render(<RouteList rutas={[]} />)
  const alerta = await waitForElement(() => getByTestId('alerta'))
  expect(alerta).toHaveTextContent(
    'Actualmente no dispones de ninguna ruta en tu POD. Accede a Añadir Ruta para añadir una nueva ruta.'
  )
})

test('Hay dos rutas, se muestran dos RouteCard con el nombre de la ruta como título.', async () => {
  // Rellenamos la lista de prueba
  setUp()
  const { getByTestId } = render(<RouteList rutas={rutas} />)
  const acordeon = await waitForElement(() => getByTestId('acordeon'))
  expect(acordeon.children.length).toBe(2)
})
