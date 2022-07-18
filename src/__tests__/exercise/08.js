// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act, screen} from '@testing-library/react'
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

test('expose the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('expose the count and increment/decrement functions with initial value and step values changed', () => {
  const INITIAL = 5
  const STEP = 2
  let result
  function TestComponent() {
    result = useCounter({initialCount: INITIAL, step: STEP})
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(INITIAL)
  act(() => result.increment())
  expect(result.count).toBe(7)
  act(() => result.decrement())
  expect(result.count).toBe(INITIAL)
})

/* eslint no-unused-vars:0 */
