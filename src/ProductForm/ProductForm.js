import React, {Component} from 'react'
import './ProductForm.css'
import SimpleProductContext from '../SimpleProductContext'
import config from '../config'

class ProductForm extends Component{
  static contextType = SimpleProductContext

  state = {
    id: '',
    name: {
      value: '',
      touched: false
    },
    details: {
      value: '',
      touched: false
    },
    price: {
      value: '',
      touched: false
    },
    logo: {
      value: {},
      touched: false
    },
    images: {
      value: [],
      touched: false
    },
    features:{
      value: [
        { 
          feature_id: '',
          feature_value:'',
          touched: false
        },
      ],
      touched: false,
    },
    storeFeatures: [],
    error: false
  }

  componentDidMount(){
    const product = this.context.products.find(product => String(product.id) === String(this.props.productId))
    if(product){
      const features = this.context.store.storeFeatures.map(storeFeature => {
        const featureId = storeFeature.feature_id
        const feature = product.features.find(feature => String(feature.feature_id) === String(featureId))
        return(
          {
            feature_id: featureId,
            feature_value: feature ? feature.feature_value : '',
            touched: false
          }
        )
      })
      this.setState({
        id: product.id,
        name: {value: product.name, touched: false},
        details: {value: product.details, touched: false},
        price: {value: product.price, touched: false},
        features: {value: features, touched: false},
        images: {value: product.images, touched: false},
        logo: {value: product.logo, touched: false},
        storeFeatures: this.context.store.storeFeatures
      })
    }else if(this.props.header === 'Add Product' && this.context.store.storeFeatures){
      let features = this.context.store.storeFeatures
      features = features.map(storeFeature => {
        const featureId = storeFeature.feature_id
        return(
          {
            feature_id: featureId,
            feature_value: '',
            touched: false
          }
        )
      })
      this.setState({
        id: '',
        name: {value: '', touched: false},
        details: {value: '', touched: false},
        price: {value: '', touched: false},
        features: {value: features, touched: false},
        images: {value: [], touched: false},
        logo: {value: '', touched: false},
        storeFeatures: this.context.store.storeFeatures
      }) 
    }
    else{
      if(this.props.history){
        this.props.history.push('/admin/product') 
      }
    }
  }

  updateProductName(name){
    this.setState({
      name:{
        value: name,
        touched: true
      }
    })
  }

  updateProductPrice(price){
    this.setState({
      price:{
        value: price,
        touched: true
      }
    })
  }

  updateProductDetails(details){
    this.setState({
      details:{
        value: details,
        touched: true
      }
    })
  }

  updateProductFeatures(value, id){
    let features = this.state.features.value
    const index = features.indexOf(features.find(feature => String(feature.feature_id) === String(id)))
    features[index] = {
      feature_id: id,
      feature_value: value,
      touched: true
    }
    this.setState({
      features:{
        value: features,
        touched: true
      }
    })
  }

  updateLogo(event){
    if(event.target.files.length !== 0){
      this.setState({
        logo:{
          value: event.target.files[0],
          touched: true
        }
      })
    }   
  }

  updateImages(event){
    if(event.target.files.length !== 0){
      this.setState({
        images:{
          value: event.target.files,
          touched: true
        }
      })
    }
  }

  validateProductName(){
    if(this.state.name.value === ''){
      return <p className='form-error-msg'>{'Enter product name. This field is required'}</p>  
    }
  }

  validateProductDetails(){
    if(this.state.details.value === ''){
      return <p className='form-error-msg'>{'Enter product name. This field is required'}</p>  
    }
  }

  validateProductPrice(){
    if(this.state.price.value === ''){
      return <p className='form-error-msg'>{'Enter product name. This field is required'}</p>  
    }
  }

  validateProductFeature(featureId){
    const productFeatures = this.state.features.value
    const feature = productFeatures.find(feature => String(feature.feature_id) === String(featureId))
    if(feature){
      if(feature.feature_value === ''){
        return true 
      }
    }
  }

  validateFeatures(){
    if(this.state.features.value.find(feature => feature.feature_value === '')){
      return <p className='form-error-msg'>{'Enter features values. This field is required'}</p>  
    }
  }

  validateProductLogo(){
    if(this.state.logo.value === ''){
      return <p className='form-error-msg'>{'Upload product logo. This field is required'}</p>  
    }
  }

  validateProductImages(){
    if(this.state.images.value === ''){
      return <p className='form-error-msg'>{'Upload product images. This field is required'}</p>  
    }
  }

  displayError(error){
    console.log(error)
  }

  handleSubmit(event, callback){
    event.preventDefault();

    const id = this.state.id
    const name = this.state.name.value
    const details = this.state.details.value
    const price = this.state.price.value
    let features = this.state.features.value.map(feature => {
      return {
          feature_id: feature.feature_id,
          feature_value: feature.feature_value,
      }
    })
    let logo = this.state.logo.value
    let images = this.state.images.value

    const product = new FormData()
    product.append('name', name)
    product.append('details', details)
    product.append('price', price)
    product.append('features', JSON.stringify(features))


    if(this.props.header === 'Add Product'){

      images = Array.from(images)
      images.forEach(image => {
        product.append('images', image)
      })

      product.append('logo', logo)

    }else if(this.props.header === 'Edit Product'){

      const originalProduct = this.context.products.find(product => String(product.id) === String(id))

      if(images !== originalProduct.images){
        images = Array.from(images)
        images.forEach(image => {
          product.append('images', image)
        })
      }else{
        product.append('images', JSON.stringify(originalProduct.images))
      } 

      if(logo !== originalProduct.images){
        product.append('logo', logo)
      }else{
        product.append('logo', originalProduct.logo)
      }

    }

    const options = {
      method: this.props.header === 'Add Product' ? 'POST' : 'PATCH',
      body: product,
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }

    const endPoint = this.props.header === 'Add Product' 
    ? `${config.API_ENDPOINT}/api/products` 
    : `${config.API_ENDPOINT}/api/products/${id}`

    fetch(endPoint, options)
    .then(response => {
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      return response;
    })
    .then(response => response.json())
    .then( product => {
      callback(product)
      window.location.href = '/store/' 
    })
    .catch(err => this.displayError(err));

  }
  
  render(){

    const productFeatures = this.state.features.value.map(feature => {
      const featureId = feature.feature_id
      const storefeature = this.state.storeFeatures.find(storeFeature => String(storeFeature.feature_id) === String(featureId))
      return(
        <div className='product-feature' key={`product-feature-${featureId}`}>
          <label htmlFor={`feature-${featureId}`}>{storefeature ? storefeature.feature_name : ''}:</label>
          <input
            type='text'
            name={`feature-name-${featureId}`} 
            id={`feature-name-${featureId}`}
            onChange={e => this.updateProductFeatures(e.target.value, featureId)}
            value={feature.feature_value}
            className={`${feature.feature_value === '' || ( feature.touched && this.validateProductFeature(featureId) ) ? 'form-error' : ''}`}
          />
        </div>
      )
    })

    let logoThumb
    if(this.state.logo.touched && this.state.logo.value){
      logoThumb = <img src={URL.createObjectURL(this.state.logo.value)} alt={'Logo Thumbnail'} />
    }else if(typeof(this.state.logo.value) === 'string' || this.state.logo.value === undefined ){
      const product = this.context.products.find(product => String(product.id) === String(this.state.id))
      if(product){
        logoThumb = <img src={`${config.API_ENDPOINT}/public/${product.logo}`} alt={'Logo Thumbnail'} />;
      }
    }

    let imageThumb
    if(this.state.images.touched && this.state.images.value){
      const imagesArray = Array.from(this.state.images.value)
      imageThumb = imagesArray.map((image, i) => {
        return <img src={URL.createObjectURL(image)} key={`image-thumb-${i}`} alt={'Product Thumbnail'} />
      })
    }else if(typeof(this.state.images.value) === 'object' || this.state.images.value === undefined ){
      const product = this.context.products.find(product => String(product.id) === String(this.state.id))
      if(product){
        imageThumb = product.images.map((image, i) => {
          return <img src={`${config.API_ENDPOINT}/public/${image}`} key={`image-thumb-${i}`} alt={'Product Thumbnail'} />;
        })
      }
    }

    return (
      <SimpleProductContext.Consumer>
        {(context) => (
          <div className='ProductForm'>
          <h1>{this.props.header}</h1>
          <form 
            className='product-form'
            encType='multipart/form-data' 
            onSubmit={e => this.handleSubmit(e, this.props.header === 'Add Product' ? context.addProduct : context.updateProduct)}
          >
              <label htmlFor='productName'>Product Name:</label>
              <input 
                  type='text'
                  name='productName' 
                  id='productName'
                  onChange={e => this.updateProductName(e.target.value)}
                  value={this.state.name.value}
                  className={`${this.state.name.touched && this.validateProductName() ? 'form-error' : ''}`}
                  >
              </input>
        
              <label htmlFor='productPrice'>Product Price:</label>
              <input 
                  type='text'
                  name='productPrice' 
                  id='productPrice'
                  onChange={e => this.updateProductPrice(e.target.value)}
                  value={this.state.price.value}
                  className={`${this.state.price.touched && this.validateProductPrice() ? 'form-error' : ''}`}
                  >
              </input>

              <label htmlFor='productDetails'>Product Details:</label>
              <textarea 
                  name='productDetails' 
                  id='productDetails'
                  onChange={e => this.updateProductDetails(e.target.value)}
                  value={this.state.details.value}
                  className={`${this.state.details.touched && this.validateProductDetails() ? 'form-error' : ''}`}
                  >
              </textarea>

              <fieldset>
                <legend>Product Features:</legend>
                {productFeatures}     
              </fieldset>

              <label htmlFor='productLogo'>Product Logo:</label>
              <div 
                className={`upload-box upload-logo ${this.state.images.touched && this.validateProductImages() ? 'form-error' : ''}`}>
                <div className='upload-area'>
                  {logoThumb}
                  <label className='logo-upload-btn upload-btn'>
                    <input 
                        type='file'
                        name='productLogo' 
                        id='productLogo'
                        onChange={e => this.updateLogo(e)}
                    />
                    Upload Logo
                  </label>
                </div>
              </div>

              <label htmlFor='productImages'>Product Images:</label>
              <div 
                className={`upload-box upload-images ${this.state.logo.touched && this.validateProductLogo() ? 'form-error' : ''}`}
              >
                <div className='upload-area'>
                  {imageThumb}
                  <label className='images-upload-btn upload-btn'>
                    <input
                        multiple 
                        type='file'
                        name='productImages' 
                        id='productImages'
                        onChange={e => this.updateImages(e)}
                    />
                    Upload Images
                  </label>
                </div>
              </div>

              <button 
                  type='submit'
                  disabled={
                      this.validateProductName() ||
                      this.validateProductPrice() ||
                      this.validateProductDetails() ||
                      this.validateProductLogo() ||
                      this.validateProductImages() || 
                      this.validateFeatures()
                  }
              >Save
              </button>
              <button type='reset'
                onClick={() => this.props.history.push('/admin/product')}
              >Cancel
              </button>
              
              <div>
                  {this.state.name.touched && this.validateProductName()}
                  {this.state.price.touched && this.validateProductPrice()}
                  {this.state.details.touched && this.validateProductDetails()}
                  {this.state.logo.touched && this.validateProductLogo()}
                  {this.state.images.touched && this.validateProductImages()}
                  {this.validateFeatures()}  
              </div> 
          </form>
          </div>       
        )}
      </SimpleProductContext.Consumer>
    )               

  }
}

export default ProductForm