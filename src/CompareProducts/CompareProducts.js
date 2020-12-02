import React, {Component} from 'react'
import SimpleProductContext from '../SimpleProductContext'
import {Link} from 'react-router-dom'
import './CompareProducts.css'
import config from '../config'

class CompareProducts extends Component{

    static contextType = SimpleProductContext

    state={
        compare: [],
        offset: 0,
        page: 1,
    }

    componentDidMount(){
        if(this.context.compare.length > 1){
          this.setState({
            compare: this.context.compare
            })  
        }else{
            if(this.props.history){
                this.props.history.push('/store') 
            }
        }
    }

    scrollProduct(event, i){
        event.preventDefault()
        this.setState({
            offset: i
        })
    }

    pagePrev(event){
        event.preventDefault()
        if(this.state.page > 1){
            this.setState({
                page:this.state.page - 1
            })
        }
    }

    pageNext(event){
        event.preventDefault()
        if(this.state.page * 4 < this.state.compare.length){
            this.setState({
                page:this.state.page + 1
            })
        }  
    }

    render(){

    const storeFeatures = this.context.store.storeFeatures
    let featuresNames
    if(storeFeatures){
        featuresNames = storeFeatures.map((storeFeature, i) => {
            return(
                <li key={`store-feature-${i}`}>{storeFeature.feature_name}</li>
            )
        })
    }

    const productsToCompare = this.state.compare
    let productData
    if(productsToCompare){
        productData = productsToCompare.map((product,i) => {
            const featuresValues = storeFeatures.map((storeFeature,j) => {
                const productFeature = product.features.find(feature => String(feature.feature_id) === String(storeFeature.feature_id))
                if(productFeature){
                    return(<li key={`feature-value-${j}`}>{productFeature.feature_value}</li>) 
                }else{
                    return(<li key={`feature-value-${j}`}>{'-'}</li>)
                }
            })
            return(
                <ul key={`product-feature-${i}`}>
                    <li><Link className='compare-product-link' to={`product/${product.id}`} onClick={this.context.clearProducts}><h3 className='compare-product-name'>{product.name}</h3></Link></li>
                    <li><img className='compare-logo' alt={'product logo'} src={`${config.API_ENDPOINT}/public/${product.logo}`}></img></li>
                    {featuresValues}
                    <li>{`$${product.price}`}</li>
                </ul>  
            )
        })
    }

    let pagination
    if(productsToCompare){
        pagination = productsToCompare.map((product,i) => {
            return(
                <li 
                    className={`${this.state.offset === i ? 'clicked' : ''}`}
                    key={`pagination-${i}`} 
                    onClick={e => this.scrollProduct(e,i)}
                    >{i+1}
                </li>
            )
        })
    }

    const win = window.innerWidth
    let offset
    if(win <= 735){
        offset = 100 * this.state.offset
    }else if(win >= 736 && win <= 1023 ){
        offset = 50 * this.state.offset
    }else{
        offset = 33.33 * this.state.offset
    }
   
    return (
        <div className='CompareProducts'>
            <div className='compare-header'>
                <h1>{'Compare'}</h1>
            </div>
            <div className='compare-table'>
                <div className='compare-features'>
                    <ul>
                        {featuresNames}
                        <li>Price</li>
                    </ul>
                </div>
                <div className='compare-container' >
                    <div className='compare-products-data' style={{right: `${offset}%`}}>
                        {productData}
                    </div>
                </div>
            </div>
            <div className='compare-footer'>
                    <button 
                        className={`pag-prev`} 
                        onClick={e => this.pagePrev(e)}
                        disabled={this.state.page === 1}>
                        {'<'}
                    </button>
                    <ul>
                        {pagination.slice(4 * (this.state.page - 1), 4 * this.state.page)}    
                    </ul>
                    <button 
                        className={`pag-next`}  
                        onClick={e => this.pageNext(e)}
                        disabled={this.state.page * 4 > this.state.compare.length}
                        >
                        {'>'}
                    </button>
            </div> 
        </div>
    )
  }

}

export default CompareProducts