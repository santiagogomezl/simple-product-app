import React, {Component} from 'react'
import SimpleProductContext from '../SimpleProductContext'
import {Link} from 'react-router-dom'
import config from '../config'
import './Product.css'

class Product extends Component{

    static contextType = SimpleProductContext

    state = {
        id: '',
        name: '',
        details: '',
        price: '',
        features: [],
        images: [],
        logo: '',
    }

    componentDidMount(){
        
        let id
        if(this.props.location){
            id = this.props.location.pathname.substring(9)
        }

        fetch(`${config.API_ENDPOINT}/api/products/${id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
          })
          .then(res => {
            if (!res.ok) {
              throw new Error(res.status)
            }
            return res.json()
          })
          .then(product => {    
            this.setState({
                id: product.id,
                name: product.name,
                details: product.details,
                price: product.price,
                features: product.features,
                images: product.images,
                logo: product.logo,
            })
          })
          .catch(error => this.setState({ error }))   
    }
    
    getPrevious(productId){
        const products = this.context.products
        if(products){
            const productIndex = products.indexOf(products.find(product => String(product.id) === String(productId)))
            let prevId
            if(productIndex === 0){
                prevId = products[products.length - 1].id
            }else if(productIndex > 0){
                prevId = products[productIndex - 1].id
            }
            return prevId
        }else{
            window.location.href = '/' 
        }   
    }

    getNext(productId){
        const products = this.context.products
        if(products){
            const productIndex = products.indexOf(products.find(product => String(product.id) === String(productId)))
            let nextId
            if(productIndex === products.length - 1){
                nextId = products[0].id
            }else if(productIndex < products.length -1){
                nextId = products[productIndex + 1].id
            }
            return nextId
        }else{
            window.location.href = '/' 
        }  
    }
       
    getFaIcon(featureId){
        const storeFeatures = this.context.store.storeFeatures
        const productFeature = storeFeatures.find(feature => String(feature.feature_id) === String(featureId))
        return  productFeature.feature_fa_icon
    }

    render(){

    const product = this.context.products.find(product => String(product.id) === String(this.props.match.params.product_id))
    let  id, name, details, price, features, images, logo, productHeader, productImages, productFeatures
    if(product){
        
        id = product.id
        name = product.name
        details = product.details
        price = product.price
        features = product.features
        images = product.images
        logo = product.logo
        const previous = this.getPrevious(id)
        const next = this.getNext(id)

        productHeader = [
            <span key={'prev'} className='prev nav-button'><Link to={`/product/${previous}`}>{'<< prev'}</Link></span>,
            <h1 key={'product-name'}>{name}</h1>,
            <span key={'next'} className='next nav-button'><Link to={`/product/${next}`}>{'next >>'}</Link></span>,
        ]

        productFeatures = features.map((feature, i) => {
            return(
                <li key={`product-feature-${i}`}>
                    <div className='product-feature'>
                        <i className={`fas ${this.getFaIcon(feature.feature_id)}`}></i>
                        <span className='featureValue'>{feature.feature_value}</span>
                    </div>
                </li>
            )               
        })

        productImages = images.map((image, i) => {
            return(
                <div key={`image-${i}`} className='image-container'><img src={`${config.API_ENDPOINT}/public/${image}`} alt='Product'></img></div>
            )
        })

    }else{
        window.location.href = '/'  
    }         

    return (
        <div className='Product'>
            <div className='product-header'>
                {productHeader}
            </div>
            <div className='product-detail'>
                <div className='product-card'>
                    <div className='product-detail-logo'>
                        <img src={`${config.API_ENDPOINT}/public/${logo}`} alt='Product Logo'></img>
                    </div>

                    <div className='product-info'>
                        <ul>
                            {productFeatures}
                        </ul>
                        <p>{details}</p>
                        <div className='product-order'>
                            <span>{price ? `$${price}` : ''}</span>
                        </div>
                    </div>
                </div> 

                <div className='product-images'>
                    {productImages}
                </div>
            </div>
        </div>
    )
  }

}

export default Product