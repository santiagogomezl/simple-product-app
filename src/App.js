import React, {Component} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Store from './Store/Store'
import Product from './Product/Product'
import Landing from './Landing/Landing'
import CompareProducts from './CompareProducts/CompareProducts'
import SimpleProductContext from './SimpleProductContext'
import config from './config'
import NotFound from './NotFound/NotFound'
//dashboard and admin
import AdminLogin from './AdminLogin/AdminLogin'
import AdminStore from './AdminStore/AdminStore'
import AdminProducts from './AdminProducts/AdminProducts'
import EditProduct from './EditProduct/EditProduct'
import AddProduct from './AddProduct/AddProduct'


class App extends Component{

  state = {
    products:[],
    compare:[],
    toCompare: false,
    error: false,
    loggedIn: false,
    store: {}
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/products`, {
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
    .then(products => {    
      this.setState({
        products
      })
    })
    .catch(error => this.setState({ error }))

    fetch(`${config.API_ENDPOINT}/api/store`, {
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
    .then(store => {     
      this.setState({
        store:{
          storeId: store.id,
          storeTitle: store.storeTitle,
          storeDescription: store.storeDescription,
          storeFeatures: store.storeFeatures,
          storeAdminCreds:{
            username: 'admin',
            password: 'admin'
          }
        }
      })
    })
    .catch(error => this.setState({ error }))

  }

  compareProducts = (product) => {
    const productId = product.id
    if(!this.state.compare.find(product => product.id === productId)){
      this.setState({
        compare: [...this.state.compare, product].sort((a, b) => {return a.id-b.id}),
        toCompare: this.state.compare.length+1 > 1 ? true : false
      })

    }else{
      const toBeCompared = this.state.compare
      const i = toBeCompared.findIndex(product => product.id === productId)
      toBeCompared.splice(i, 1)
      this.setState({
        compare: toBeCompared.sort((a, b) => {return a.id-b.id}),
        toCompare: this.state.compare.length-1 >= 1 ? true : false
      })
    }

  }

  clearProducts = () => {
   this.setState({
     compare: [],
     toCompare: false,
   })
  }

  updateStore = (store) =>{
    this.setState({
      store: {
        storeId: store.id,
        storeTitle: store.title,
        storeDescription: store.description,
        storeFeatures: store.features,
        storeAdminCreds:{
          username: 'admin',
          password: 'admin'
        }
      }
    })
  }

  updateProduct = (updatedProduct) =>{
    let products = this.state.products
    const index = products.indexOf(products.find(product => String(product.id) === String(updatedProduct.id)))
    products[index] = updatedProduct
    this.setState({
      products: products
    })
  }

  addProduct = (newProduct) =>{
    let products = this.state.products
    products.push(newProduct)
    this.setState({
      products: products
    })
  }

  deleteProduct = (productId) =>{
    let products = this.state.products
    const index = products.indexOf(products.find(product => String(product.id) === String(productId)))
    products.splice(index, 1)
    this.setState({
      products: products
    })
  }

  logIn = (credentials) =>{
    const storeAdminCreds = this.state.store.storeAdminCreds
    if(credentials.username === storeAdminCreds.username && credentials.password === storeAdminCreds.password){
      this.setState({
        loggedIn: true
      })
      return true
    }else{
      return false
    }
  }

  logOut = () =>{
    if(this.state.loggedIn){
      this.setState({
        loggedIn: false
      })
    }
  }

  render(){

    const contextValue = {
      products: this.state.products,
      compare: this.state.compare,
      toCompare: this.state.toCompare,
      toReset: this.state.toCompare,
      loggedIn: this.state.loggedIn,
      compareProducts: this.compareProducts,
      clearProducts: this.clearProducts,
      //dashboard and admin
      store: this.state.store,
      updateStore: this.updateStore,
      updateProduct: this.updateProduct,
      addProduct: this.addProduct,
      deleteProduct: this.deleteProduct,
      logIn: this.logIn,
      logOut: this.logOut
    }

    return(
      <main className='App'>
        <BrowserRouter>
          <SimpleProductContext.Provider value={contextValue}>

            <Header/>
                <Switch>
                  {/* Home */}
                  <Route exact path='/' component={Landing} />

                  {/*Demo*/}
                  <Route path='/store' component={Store} />

                  {/* /product/:product_id */}
                  <Route path='/product/:product_id' component={Product}/> 

                  <Route path='/compare/' component={CompareProducts}/>

                  {/* admin */}
                  <Route exact path={'/admin'} component={AdminLogin} />
                  <Route path={'/admin/store'} component={AdminStore} />
                  <Route path={'/admin/product'} component={AdminProducts} />
                  <Route path={'/admin/edit/product'} render={props => <EditProduct {...props}/>}/>
                  <Route path={'/admin/add/product'} render={props => <AddProduct {...props} />}/>

                  <Route path={'*'} component={NotFound} />

                </Switch>
            
            <Footer />
          </SimpleProductContext.Provider> 
        </BrowserRouter>
      </main>
    )
  } 

}

export default App