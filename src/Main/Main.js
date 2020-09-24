import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import Product from '../Product/Product'
import ProductDetail from '../ProductDetail/ProductDetail'
import SimpleProductContext from '../SimpleProductContext';
import CompareProducts from '../CompareProducts/CompareProducts';

class Main extends Component{
  static contextType = SimpleProductContext;

  getBarbell(barbellName){
    const name = barbellName.charAt(0).toUpperCase() + barbellName.slice(1)
    return this.context.barbells.find( barbell => name === barbell.name);
  }

  getPrevious(current){
    const id = current ? current.id : ''
    let prevId
    if(id === 1){
      prevId = this.context.barbells.length
    }else{
      prevId = id - 1
    }
    return this.context.barbells.find( barbell => prevId === barbell.id);
  }

  getNext(current){
    const id = current ? current.id : ''
    let nextId
    if(id === this.context.barbells.length){
      nextId = 1
    }else{
      nextId = id +1
    }
    return this.context.barbells.find( barbell => nextId === barbell.id);
  }

  render(){

    let content = [];
    let contentHeader = [];

    if(this.props.match.path === '/barbell/:name'){
      const barbellName = this.props.match.params.name;
      const barbell = this.getBarbell(barbellName);
      const previous = this.getPrevious(barbell)
      const next = this.getNext(barbell)
      contentHeader = [
        <span className="prev nav-button"><Link to={previous ? previous.name.toLowerCase() : ''}>{'<< prev'}</Link></span>,
        <h1>{barbellName}</h1>,
        <span className="next nav-button"><Link to={next ? next.name.toLowerCase() : ''}>{'next >>'}</Link></span>,
      ]
      if(typeof barbell !== 'undefined'){
          content = [
              <ProductDetail {...barbell} history={this.props.history}/>,
          ]
      }
    }
    
    else if(this.props.match.path === '/compare/'){
      contentHeader = <h1>{"COMPARE PRODUCTS"}</h1>
      content = [
        <CompareProducts compare={this.context.compare}/>,
    ]
    }


    else if(this.props.match.path === '/'){
      contentHeader = <h1>{"JUST A BARBELL"}</h1>
      content = this.context.barbells.map((barbell, i) => {
        const key = `${i}`;
        return(<Product key={key} {...barbell} />)
      }) 
    }

    return (
        <section className="Main">
            <div className="main-header">
              {contentHeader}
            </div>
            <div className="products-container">
              {content}
            </div>
        </section>
    );
  }

}

export default Main;