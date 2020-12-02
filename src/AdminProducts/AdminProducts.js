import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './AdminProducts.css'
import SimpleProductContext from '../SimpleProductContext'
import config from '../config'
import AdminHeader from '../AdminHeader/AdminHeader'


class AdminProducts extends Component{
  static contextType = SimpleProductContext

  displayProduct(event){
    event.preventDefault()
    const productsMenu = document.querySelector('.products-menu')
    const arrowDown = document.querySelector('.fa-chevron-down')

    productsMenu.classList.toggle('hide')
    arrowDown.classList.toggle('rotated')
    
  }

  componentDidMount(){
    if(!this.context.loggedIn){
      if(this.props.history){
        this.props.history.push('/admin') 
      }
    }
  }

  render(){

    const storeProducts = this.context.products
    let productsMenu
    if(storeProducts){
      productsMenu = storeProducts.map((product) => {
        return(
        <li 
          className={`${String(this.props.location.search.substring(4)) === String(product.id) ? 'active-product' : ''}`}
          key={`product-menu-${product.id}`}>
          <Link to={`/admin/product?id=${product.id}`}>{product.name}</Link>
        </li>
        )   
      })
    }

    const addProductBtn = <Link to={`/admin/add/product`}><button>Add Product</button></Link>

    const product = storeProducts.find(product => String(product.id) === String(this.props.location.search.substring(4)))
    let productDetail
    if(product){
      productDetail = 
        <div className='product-detail'>
          <h3>{product.name}</h3>
          <p>{product.details}</p>
          <p>{`$${product.price}`}</p>
          <div className='admin-logo-thumb'>
            <img src={`${config.API_ENDPOINT}/public/${product.logo}`} alt={'Logo Thumbnail'} />
          </div>
          <Link to={`/admin/edit/product?id=${product.id}`}><button>Edit</button></Link>
        </div>
    }

    return (
      <div className='AdminProducts'>
        <AdminHeader {...this.props} header={'products'}/>
        {addProductBtn}
        <div className='products-menu-container'>
          <div className='select-product' onClick={e => this.displayProduct(e)}>
            <label>Select product...</label>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className='products-menu hide'>
            {productsMenu}
          </ul>
        </div>
          {productDetail}
      </div>       
    )
    
  }

}

export default AdminProducts