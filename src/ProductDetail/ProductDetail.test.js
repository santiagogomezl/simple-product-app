import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import ProductDetail from './ProductDetail'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter><ProductDetail /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
