import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import Landing from './Landing/Landing'
import SimpleProductContext from './SimpleProductContext'
import config from './config';
import NotFound from './NotFound/NotFound'



class App extends Component{

  constructor(props){
    super(props)
    
    this.state = {
      barbells:[],
      compare:[],
      toCompare: false,
      error: null,
    }
  }

  setProduts = barbells => {
    this.setState({
      barbells,
      compare:[],
      toCompare: false,
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
          <Switch>
            {/* Home */}
            <Route exact path='/' component={Landing} />

            {/*Demo*/}
            <Route path='/demo' component={Main} />

            {/* /barbell/:name */}
            <Route path='/barbell/:name' component={Main}/> 

            <Route path='/compare/' component={Main}/>

            <Route path={'*'} component={NotFound} />
          </Switch>
        </SimpleProductContext.Provider>
        <Footer />        
      </main>
    );
  } 

}

export default App;