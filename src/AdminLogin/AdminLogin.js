import React, {Component} from 'react'
import './AdminLogin.css'
import SimpleProductContext from '../SimpleProductContext'


class AdminLogin extends Component{
  static contextType = SimpleProductContext

  state= {
    username: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    error: false
  }

  componentDidMount(){
    const loggedIn = this.context.loggedIn
    if(loggedIn){
      this.props.history.push('/admin/store')
    }
  }

  updateUsername(username){
    this.setState({
      username:{
        value: username,
        touched: true
      }
    })
  }

  updatePassword(password){
    this.setState({
      password:{
        value: password,
        touched: true
      }
    })
  }

  validateUsername(){
    if(this.state.username.value === ''){
      return <p className='form-error-msg'>{'Username is required'}</p>  
    }
  }

  validatePassword(){
    if(this.state.password.value === ''){
      return <p className='form-error-msg'>{'Password is required'}</p>  
    }
  }

  validateCreds(){
    if(this.state.error){
      return <p className='form-error-msg'>{'Incorrect username or password'}</p>  
    }
  }

  handleSubmit(event, callback){
    event.preventDefault();

      const credentials = {
        username: this.state.username.value,
        password: this.state.password.value
      }
        if(callback(credentials)){
          this.setState({error: false})
          this.props.history.push('/admin/store')  
        }else{
          this.setState({error: true})
        }
  }

  render(){

    return (
      <SimpleProductContext.Consumer>
        {(context) => (
          <div className='AdminLogin'>
            <h1>Log In</h1>
            <form 
              className='login-form'
              onSubmit={e => this.handleSubmit(e, context.logIn)}
            >
            <label htmlFor='username'>Username:</label>
            <input 
                type='text'
                name='username' 
                id='username'
                onChange={e => this.updateUsername(e.target.value)}
                value={this.state.username.value}
                className={`${this.state.username.touched && this.validateUsername() ? 'form-error' : ''}`}
            />
            <br/>

            <label htmlFor='password'>Password:</label>
            <input 
                type='password'
                name='password' 
                id='password'
                onChange={e => this.updatePassword(e.target.value)}
                value={this.state.password.value}
                className={`${this.state.password.touched && this.validatePassword() ? 'form-error' : ''}`}
            />
            <br/>

              <button 
                  type='submit'
                  disabled={
                      this.validateUsername() ||
                      this.validatePassword() 
                  }
              >Log In
              </button>
              
              <div>
                  {this.state.username.touched && this.validateUsername()}
                  {this.state.password.touched && this.validatePassword()}
                  {this.validateCreds()}
              </div> 

            </form>
          </div>
      )}
      </SimpleProductContext.Consumer>
    ) 
  }

}

export default AdminLogin