import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './AdminHeader.css'
import SimpleProductContext from '../SimpleProductContext'


class AdminHeader extends Component{
  static contextType = SimpleProductContext


  render(){

    return (
      <div className='AdminHeader'>
        <nav className='admin-nav site-menu'>
          <ul>
            <li className={`store-tab ${this.props.header === 'store' ? 'active-tab' : ''}`}><Link to={'/admin/store'}>Store</Link></li>
            <li className={`products-tab ${this.props.header === 'products' ? 'active-tab' : ''}`}><Link to={'/admin/product'}>Products</Link></li>   
          </ul>
        </nav>
        <h1>{this.props.header}</h1>
      </div>
    ) 
  }

}

export default AdminHeader