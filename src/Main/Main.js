import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Main.css';
import Product from '../Product/Product'
import ProductDetail from '../ProductDetail/ProductDetail'
import SimpleProductContext from '../SimpleProductContext';
import CompareProducts from '../CompareProducts/CompareProducts';

class Main extends Component{
  static contextType = SimpleProductContext;
  static defaultProps={
    match: {params: '/demo'}
  }
  

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
    const path = this.props.match.path
   

    if( path === '/barbell/:name'){
      const barbellName = this.props.match.params.name;
      const barbell = this.getBarbell(barbellName);
      const previous = this.getPrevious(barbell)
      const next = this.getNext(barbell)
      contentHeader = [
        <span key={'prev'} className="prev nav-button"><Link to={previous ? previous.name.toLowerCase() : ''}>{'<< prev'}</Link></span>,
        <h1 key={'barbell-name'}>{barbellName}</h1>,
        <span key={'next'} className="next nav-button"><Link to={next ? next.name.toLowerCase() : ''}>{'next >>'}</Link></span>,
      ]
      if(typeof barbell !== 'undefined'){
          content = [
              <ProductDetail key={`product-${barbell.id}`} {...barbell} history={this.props.history}/>,
          ]
      }else{
          this.props.history.push('/')
      }
    }
    
    else if(path === '/compare/'){
      contentHeader = <h1>{"COMPARE"}</h1>
      content = [
        <CompareProducts key={'compare'} compare={this.context.compare} history={this.props.history}/>,
    ]
    }


    else if(path === '/demo'){
      contentHeader = <h1>{"JUST A BARBELL"}</h1>
      content = [
        <p className="demo-intro" key={'demo-intro'}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
          quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. 
        </p>
      ]
      content = [content, this.context.barbells.map((barbell, i) => {
          const key = `${i}`;
          return(<Product key={key} {...barbell} />)
        })
      ] 
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