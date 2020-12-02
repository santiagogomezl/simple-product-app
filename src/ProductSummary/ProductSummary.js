import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SimpleProductContext from '../SimpleProductContext'
import './ProductSummary.css'
import config from '../config'

class ProductSummary extends Component{
    static contextType = SimpleProductContext
    static defaultProps={
        name: '',
        }
        
    state={
        clicked: false
    }

    //Updates 'clicked' state throught context
    handleCompare(event, callback){
        event.preventDefault()
        callback(this.props)
        this.setState({clicked: (!this.state.clicked)})
        this.toogleClass(this.props.id)
    }

    //Toogles class to compare button
    toogleClass(id){
        if(!document.getElementById(`compare-${id}`).classList.contains('clicked-button')){
            document.getElementById(`compare-${id}`).classList.add('clicked-button')
        }else{
            document.getElementById(`compare-${id}`).classList.remove('clicked-button')
        } 
    }

    componentDidUpdate(){
        if(this.context.compare.length === 0 && this.state.clicked){
            this.toogleClass(this.props.id)
            this.setState({clicked: false})
        }
    }
  
  render(){

    const {id, name, logo, price, features } = this.props

    let productFeatures
    const storeFeatures = this.context.store.storeFeatures
    if(features){
        productFeatures = features.map((feature, i) => {
            const storeFeature = storeFeatures.find(storeFeature => String(storeFeature.feature_id) === String(feature.feature_id))
                return(
                    <li key={`product-features-sum-${i}`}>
                        <i className={`fas ${storeFeature.feature_fa_icon}`}></i>
                        <span>{feature.feature_value}</span>
                    </li>
                )
        })
    }

    return (
        <SimpleProductContext.Consumer>
        {(context) => (
            <div className='ProductSummary'>
                <div className='product-information'>
                    <div><h3>{name}</h3> <span>{`$${price}`}</span></div>
                    <ul>
                        {productFeatures}
                    </ul>
                </div>
                <div className='product-link' style={{backgroundImage: `url(${config.API_ENDPOINT}/public/${logo})`}}>
                    <Link to={`/product/${id}`} onClick={context.clearProducts}></Link>
                </div>
                <button id={`compare-${id}`} className={`compare-button`} onClick={e => this.handleCompare(e, context.compareProducts)}>compare</button>
            </div>
        )}
        </SimpleProductContext.Consumer>
    )
  }

}

export default ProductSummary