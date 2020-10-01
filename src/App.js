import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import SimpleProductContext from './SimpleProductContext'
import config from './config';



class App extends Component{

  constructor(props){
    super(props)
    
    this.state = {
      barbells:[],
      compare:[],
      toCompare: false,
    }
  }

  setProduts = barbells => {
    this.setState({
      barbells,
      error: null,
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setProduts)
      .catch(error => this.setState({ error }))
  }

  compareProducts = (barbell) => {
    const barbellId = barbell.id
    if(!this.state.compare.find(barbell => barbell.id === barbellId)){
      this.setState({
        compare: [...this.state.compare, barbell].sort((a, b) => {return a.id-b.id}),
        toCompare: this.state.compare.length+1 > 1 ? true : false
      });

    }else{
      const toBeCompared = this.state.compare;
      const i = toBeCompared.findIndex(barbell => barbell.id === barbellId)
      toBeCompared.splice(i, 1)
      this.setState({
        compare: toBeCompared.sort((a, b) => {return a.id-b.id}),
        toCompare: this.state.compare.length-1 >= 1 ? true : false
      });
    }

  }

  clearProducts = () => {
   this.setState({
     compare: [],
     toCompare: false,
   })
  }

  render(){

    const contextValue = {
      barbells: this.state.barbells,
      compare: this.state.compare,
      toCompare: this.state.toCompare,
      toReset: this.state.toCompare,
      compareProducts: this.compareProducts,
      clearProducts: this.clearProducts,
    }

    return(
      <main className='App'>
        <SimpleProductContext.Provider value={contextValue}>

        <Header/>
          {/* Main */}
          <Route exact path='/' component={Main} />

          {/* /barbell/:name */}
          <Route path='/barbell/:name' component={Main}/> 

          <Route path='/compare/' component={Main}/>

        </SimpleProductContext.Provider>
        <Footer />        
      </main>
    );
  } 

}

export default App;