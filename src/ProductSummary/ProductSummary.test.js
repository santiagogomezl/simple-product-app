import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import ProductSummary from './ProductSummary'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter><ProductSummary /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
