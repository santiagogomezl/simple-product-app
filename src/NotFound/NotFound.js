import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component{
    
  
  render(){
    return (
        <div className="NotFound">
            <h1>Page Not Found</h1>
            <p>Somethign went wrong. Try going back to the Home Page</p>
            <Link to={'/'}>Home</Link>
        </div>

    );
  }

}

export default NotFound;