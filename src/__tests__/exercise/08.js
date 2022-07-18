// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterHookExample({initialCount = 0, step = 1}) {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

beforeEach(() => {
  jest.resetAllMocks()
})

test('exposes the count and increment/decrement functions', async () => {
  render(<UseCounterHookExample />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

test('initial count and step modification', async () => {
  render(<UseCounterHookExample initialCount={2} step={2} />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 2')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 4')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 2')
})

/* eslint no-unused-vars:0 */
