import React from 'react'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CommentBox from '../front-end/components/share/CommentBox'

test('Se renderizan bien los componentes de CommentBox', () => {
  afterAll(cleanup)
  const { getByTestId, getAllByTestId } = render(<CommentBox />)
  // let dialogo = await waitForElement(() => getByTestId("componenteModal"));
  expect(getByTestId('Acordeon')).toBeTruthy()
  expect(getByTestId('cardEnv')).toBeTruthy()
  expect(getByTestId('btComment')).toHaveTextContent('Comentarios')
  expect(getByTestId('cajaComent')).toBeTruthy()
  expect(getByTestId('btPublicar')).toHaveTextContent('Publicar')
})
