// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)
  const username = 'ralph'
  const password = 'mypass'

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(submittedData).toEqual({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
