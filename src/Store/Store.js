import React, {Component} from 'react'
import './Store.css'
import ProductSummary from '../ProductSummary/ProductSummary'
import SimpleProductContext from '../SimpleProductContext'

class Store extends Component{

  static contextType = SimpleProductContext

  state = {
    storeTitle: '',
    storeDescription: '',
    storeFeatures: []
  }
  
  componentDidMount(){
    if(this.context.store.storeTitle){
      this.setState({
        storeTitle: this.context.store.storeTitle,
        storeDescription: this.context.store.storeDescription,
        storeFeatures: this.context.store.storeFeatures 
      })
    }else{
      window.location.href = '/'  
    } 
  }

  render(){
     
    const products = this.context.products.map((product, i) => {
        return(
          <ProductSummary key={`product-${i}`} {...product} />
        )
    })

    return (
      <div className='Store'>
          <div className='store-header'>
            <h1>{this.state.storeTitle}</h1>
            <p>{this.state.storeDescription}</p>
          </div>
          <div className='store-products'>
            {products}
          </div>
      </div>
    )
  }

}

export default Store