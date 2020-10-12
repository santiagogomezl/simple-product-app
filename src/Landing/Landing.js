import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'

class Landing extends Component{
  
  render(){
    return (
        <div className="Landing">
          <div className="hero">
              <div className="hero-details">
                  <h1>Set Your Idea in Motion</h1>
                  <p>Use this App to simply launch your next product or idea. 
                      Gather feedback and results for your future enterprise.
                      Hassel free.
                  </p>
                  <Link to={'/demo'} role="button" className="demo-button">See Demo</Link>
              </div>
          </div>
        </div>
    )
  }
  
}


export default Landing