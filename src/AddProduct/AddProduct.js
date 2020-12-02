import React, {Component} from 'react'
import './AddProduct.css'
import ProductForm from '../ProductForm/ProductForm'
import SimpleProductContext from '../SimpleProductContext'

class AddProduct extends Component{

  static contextType = SimpleProductContext

  componentDidMount(){
    if(!this.context.loggedIn){
      if(this.props.history){
        this.props.history.push('/admin') 
      }
    }
  }
  
  render(){

    return (
      <SimpleProductContext.Consumer>
        {(context) => (
          <div className='AddProduct'>
            <ProductForm header={'Add Product'} {...this.props}/>
          </div>       
        )}
      </SimpleProductContext.Consumer>
    )               

  }

}

export default AddProduct