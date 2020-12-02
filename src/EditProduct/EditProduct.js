import React, {Component} from 'react'
import './EditProduct.css'
import ProductForm from '../ProductForm/ProductForm'
import DeleteProduct from '../DeleteProduct/DeleteProduct'
import SimpleProductContext from '../SimpleProductContext'

class EditProduct extends Component{

  static contextType = SimpleProductContext


  componentDidMount(){
    if(!this.context.loggedIn){
      if(this.props.history){
        this.props.history.push('/admin') 
      }
    }
  }

  render(){
    
    let productId
    if(this.props.location){
      productId = this.props.location.search.substring(4)
    }

    return (
      <div className='EditProduct'>
        <ProductForm productId={productId} header={'Edit Product'} {...this.props}/>
        <DeleteProduct productId={productId} {...this.props}/>
      </div>       
    )               
  }

}

export default EditProduct