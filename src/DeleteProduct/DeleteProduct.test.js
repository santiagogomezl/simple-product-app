import React from 'react'
import ReactDOM from 'react-dom'
import DeleteProduct from './DeleteProduct'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DeleteProduct />, div)
  ReactDOM.unmountComponentAtNode(div)
})
