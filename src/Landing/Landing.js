import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'

class Landing extends Component{
  
  render(){
    return (
        <div className='Landing'>
          <div className='hero'>
              <div className='hero-details'>
                  <h1>Set Your Idea in Motion</h1>
                  <p>Use this App to simply launch your next product or idea. 
                      Gather feedback and results for your future enterprise.
                      Hassle free.
                  </p>
                  <Link to={'/store'} role='button' className='demo-button'>See Demo</Link>
              </div>
          </div>
          <section className='spa-features'>
            <div className='spa-features-info'>
              <h2>Manage Store And Products</h2>
              <ul>
                <li>Create and manage products</li>
                <li>Add icons from: <a href={'https://fontawesome.com/'} target={'_blank'} rel='noopener noreferrer'>fontawesome.com</a></li>
                <li>Compare Products</li>
                <li>Upload Images</li>
              </ul>
            </div>
            
            <div className='spa-features-image'>
              <img src={'./img/spa-layout.png'} alt={'App Layout'}/>
            </div>
          </section>
        </div>
    )
  }
  
}


export default Landing