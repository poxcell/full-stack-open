import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm tests', () => {
  test('Component renders initial state', () => {
    const mockHandler = jest.fn()

    const component = render(
      <NewBlogForm handleSubmit={mockHandler}/>
    )

    expect(component.container).toHaveTextContent('title')
  })

  test('Component has not invoked passed event handler', () => {
    const mockHandler = jest.fn()

    const component = render(
      <NewBlogForm handleSubmit={mockHandler}/>
    )
    expect(component.container).toHaveTextContent('title')
    expect(mockHandler.mock.calls).toHaveLength(0)
  })

  test('Component has not invoked passed event handler', () => {
    const mockHandler = jest.fn()

    const component = render(
      <NewBlogForm handleSubmit={mockHandler}/>
    )
    expect(component.container).toHaveTextContent('title')

    const button = component.container.querySelector('#button')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})