import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SimpleProductContext from '../SimpleProductContext'
import './Product.css'

class Product extends Component{
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
    const {id, name, logo } = this.props
    return (
            <SimpleProductContext.Consumer>
            {(context) => (
            <div className="Product">
                <div className="product-link" style={{backgroundImage: `url(../img/${logo})`}}>
                    <Link to={`/barbell/${(name.toLowerCase())}`} onClick={context.clearProducts}>
                        <div className="product-information">
                            <h2>{name}</h2>
                        </div>
                    </Link>
                </div>
                <button id={`compare-${id}`} className={`compare-button`} onClick={e => this.handleCompare(e, context.compareProducts)}>compare</button>
            </div>
            )}
            
            </SimpleProductContext.Consumer>
    )
  }

}

export default Product