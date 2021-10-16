
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const log = () => {
  console.log('a')
}
describe('basic blog functionality', () => {

  test('renders blog title', () => {
    const blog = {
      user:'123412341',
      likes:'10',
      author:'manuel',
      title:'testing react apps',
      url:'www.goolge.com'
    }

    const component = render(
      <Blog blog={blog} removePost={log} likePost={log}/>
    )

    expect(component.container).toHaveTextContent(
      'testing react apps'
    )
  })
  test('default blog does not display url', () => {
    const blog = {
      user:'123412341',
      likes:'10',
      author:'manuel',
      title:'testing react apps',
      url:'www.goolge.com'
    }

    const component = render(
      <Blog blog={blog} removePost={log} likePost={log}/>
    )

    expect(component.container).not.toHaveTextContent(
      'www.goolge.com'
    )
  })

  test('clicked blog renders url', () => {
    const blog = {
      user:'123412341',
      likes:'10',
      author:'manuel',
      title:'testing react apps',
      url:'www.goolge.com'
    }

    const component = render(
      <Blog blog={blog} removePost={log} likePost={log}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.goolge.com'
    )
  })

  test('clicked like button works', () => {
    const blog = {
      user:'123412341',
      likes:'10',
      author:'manuel',
      title:'testing react apps',
      url:'www.goolge.com'
    }

    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} removePost={log} likePost={mockHandler}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'like'
    )

    const likeButton =  component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})