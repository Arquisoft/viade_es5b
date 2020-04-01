import React from 'react'
import ReactDOM from 'react-dom'
import VerRutas from '../front-end/components/ruta/VerRutas/VerRutas'
import Ruta from '../front-end/model/Ruta'
import Hito from '../front-end/model/Hito'
import { render, getByText } from '@testing-library/react'
import '@testing-library/jest-dom'
import RouteList from '../front-end/components/ruta/VerRutas/RouteList'

// Ruta de prueba
const ruta = new Ruta('Ruta Avilés', [4.5, 5.4], 'Muy buena ruta, entretenida.')
const hito1 = new Hito('Niemeyer', 4, 3.2)
const hito2 = new Hito('Parque Ferrera', 4.5, 5.7)
ruta.addHito(hito1)
ruta.addHito(hito2)
console.log('-------------------' + ruta.getHitos().length)

test('se renderiza sin fallos', () => {
  const div = document.createElement('div')
  ReactDOM.render(<VerRutas />, div)
})
