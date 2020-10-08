import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';


class Footer extends Component{
  
    render(){
      return (
            <footer className="Footer" >
              <div className="footer-container" >
                <div className="footer-branding">
                  <img src={"../favicon.png"} alt="Site Logo"></img>
                  <h3><Link to={'/'} >Simple Product App</Link></h3>
                  <p>© 2020 Santiago Gomez. All Rights Reserved.</p>
                </div>
              </div>
            </footer>
      );
    }
  
  }
  
  export default Footer;