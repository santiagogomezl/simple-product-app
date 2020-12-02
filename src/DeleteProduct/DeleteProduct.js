import React, {Component} from 'react'
import './DeleteProduct.css'
import SimpleProductContext from '../SimpleProductContext'
import config from '../config'

class DeleteProduct extends Component{

  static contextType = SimpleProductContext

  handleDelete(event,callback){
    event.preventDefault();

    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }

    const endPoint = `${config.API_ENDPOINT}/api/products/${this.props.productId}`

    fetch(endPoint, options)
    .then(response => {
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      return response;
    })
    .then(response => response.json())
    .then( (product) => {
      callback(product.id)
      this.props.history.push('/admin/product') 
    })
    .catch(err => this.displayError(err));
  }

  render(){

    return (
      <SimpleProductContext.Consumer>
        {(context) => (
          <div className='DeleteProduct'>
            <button onClick={e => this.handleDelete(e, context.deleteProduct)}>Delete</button>
          </div>       
        )}
      </SimpleProductContext.Consumer>
    )               

  }

}

export default DeleteProduct