import React from 'react'
import ReactDOM from 'react-dom'
import CompareProducts from './CompareProducts'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CompareProducts />, div)
  ReactDOM.unmountComponentAtNode(div)
})
