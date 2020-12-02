import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import AdminProducts from './AdminProducts'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><AdminProducts /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
