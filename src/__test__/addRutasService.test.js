import RutaService from '../front-end/services/rutas/RutaService'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
let rs = new RutaService();

afterAll(cleanup);

test("Añadir una ruta", () => {
        expect(rs.getRutas()).toBe(2);
});