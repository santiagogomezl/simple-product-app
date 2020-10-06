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
          <div className="header-container">
            <div className="header-brand">
                <Link to='/' onClick={context.clearProducts}><span></span></Link>
            </div>
            <nav className="header-menu">
              <ul>
                <li><Link to={'/'} onClick={context.clearProducts}>Home</Link></li>
                <li><Link to={'/demo'} onClick={context.clearProducts}>Demo</Link></li>
              </ul>
            </nav>
            <div className={`header-compare ${this.context.toCompare ? 'show-compare' : ''}`}>
                <Link to='/compare'><button className="header-button">{'compare >>'}</button></Link>
            </div>
         </div>
     </header>
      )}
     </SimpleProductContext.Consumer>
    );
  }
  
}


export default Header;