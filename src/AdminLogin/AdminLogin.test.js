import React from 'react'
import ReactDOM from 'react-dom'
import AdminLogin from './AdminLogin'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AdminLogin />, div)
  ReactDOM.unmountComponentAtNode(div)
})
