import React from 'react'
import ReactDOM from 'react-dom'
import ProductForm from './ProductForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ProductForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})
