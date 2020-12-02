import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import AdminHeader from './AdminHeader'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><AdminHeader /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
