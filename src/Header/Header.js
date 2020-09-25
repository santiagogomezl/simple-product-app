import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SimpleProductContext from '../SimpleProductContext'
import './Header.css';

class Header extends Component{
  static contextType = SimpleProductContext
  
  render(){
    return (
      <SimpleProductContext.Consumer>
      {(context) => (
       <header className="Header">
         <div className="header-brand">
            <Link to='/' onClick={context.clearProducts}><span>FORTIX</span></Link>
         </div>
         <div className={`header-compare ${this.context.toCompare ? 'show-compare' : ''}`}>
            <Link to='/compare'><button className="header-button">{'compare >>'}</button></Link>
         </div>
     </header>
      )}
     </SimpleProductContext.Consumer>
    );
  }
  
}


export default Header;