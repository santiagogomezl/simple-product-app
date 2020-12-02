import React, {Component} from 'react'
import './AdminStore.css'
import { v4 as uuidv4 } from 'uuid';
import SimpleProductContext from '../SimpleProductContext'
import config from '../config'
import AdminHeader from '../AdminHeader/AdminHeader'


class AdminStore extends Component{
  static contextType = SimpleProductContext

  state = {
    storeId: '',
    storeTitle: {
      value: '',
      touched: false
    },
    storeDescription: {
      value: '',
      touched: false
    },
    storeFeatures:{
      value: [
        { 
          featureId:'',
          featureName: '',
          featureFaCode: '',
          touched: false,
        },
      ],
      touched: false,
    },
    error: false
  }


  componentDidMount(){
    if(!this.context.loggedIn){
      if(this.props.history){
        this.props.history.push('/admin') 
      }
    }
    if(this.context.store.storeId){
      const {storeId, storeTitle, storeDescription, storeFeatures } = this.context.store
      const features = storeFeatures.map(feature => {
        return(
          {
            featureId: feature.feature_id,
            featureName: feature.feature_name,
            featureFaCode: feature.feature_fa_icon,
            touched: false
          }
        )
      })
      this.setState({
        storeId: storeId,
        storeTitle: {value : storeTitle, touched: false},
        storeDescription: {value : storeDescription, touched: false},
        storeFeatures: {value: features, touched: false}
      })
    }else{
      if(this.props.history){
        this.props.history.push('/') 
      }
    }
  }


  updateStoreTitle(storeTitle){
    this.setState({
      storeTitle: {value: storeTitle, touched: true}
    })
  }

  updateStoreDescription(storeDescription){
    this.setState({
      storeDescription: {value: storeDescription, touched: true}
    })
  }

  updateStoreFeature(featureValue, featureId, featureProp){
    let storeFeatures = this.state.storeFeatures.value
    const featureIndex = storeFeatures.indexOf(storeFeatures.find(feature => String(feature.featureId) === String(featureId)))
    if(featureProp === 'name'){
      storeFeatures[featureIndex].featureName = featureValue
      storeFeatures[featureIndex].touched = true
      this.setState({
        storeFeatures:{ value: storeFeatures, touched: true},
        error: featureValue === '' ? true : false
      })
    }else if(featureProp === 'faCode'){
      storeFeatures[featureIndex].featureFaCode = featureValue
      storeFeatures[featureIndex].touched = true
      this.setState({
        storeFeatures:{ value: storeFeatures, touched: true},
        error: featureValue === '' ? true : false
      })
    }
  }

  displayError(err){
    console.log(err);
  }

  validateStoreTitle(){
    if(this.state.storeTitle.value === ''){
      return <p className='form-error-msg'>{'Enter store title. This field is required'}</p>  
    }
  }

  validateStoreDescription(){
    if(this.state.storeDescription.value === ''){
      return <p className='form-error-msg'>{'Enter store description. This field is required'}</p>  
    }
  }

  validateStoreFeature(featureId){
    const storeFeatures = this.state.storeFeatures.value
    const feature = storeFeatures.find(feature => String(feature.featureId) === String(featureId))
    if(feature){
      if(feature.featureName === '' || feature.featureFaCode === ''){
        return true 
      }
    }
  }

  deleteFeature(event, featureId){
    event.preventDefault();
    const storeFeatures = this.state.storeFeatures.value.filter(feature => String(feature.featureId) !== String(featureId))
    const hasError = storeFeatures.find(feature => feature.featureName === '' || feature.featureFaCode === '' ) 
    if(storeFeatures){
      this.setState({
        storeFeatures:{
          value: storeFeatures,
          touched: true
        },
        error: hasError ? true : false
      })
    } 
  }

  addFeature(event){
    event.preventDefault();
    const storeFeatures = this.state.storeFeatures.value
    const newFeature = {
      featureId: uuidv4(),
      featureName: 'New Feature',
      featureFaCode: 'fa-new-feature',
      touched: false,
    }
    this.setState({
      storeFeatures:{
        value: [...storeFeatures, newFeature], 
        touched: true
      }
    })
  }

  handleSubmit(event, callback){
    event.preventDefault();

    const id = this.state.storeId
    const title = this.state.storeTitle.value
    const description = this.state.storeDescription.value
    const features = this.state.storeFeatures.value.map(feature => {
      return {
          feature_id: feature.featureId,
          feature_name: feature.featureName,
          feature_fa_icon: feature.featureFaCode
      }
    })  

    const db_store = { title, description, features}

    const options = {
      method: 'PATCH',
      body: JSON.stringify(db_store),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    };

    fetch(`${config.API_ENDPOINT}/api/store/${id}`, options)
    .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {

        const storeId = data.id
        const storeTitle = data.title
        const storeDescription = data.description
        const storeFeatures = data.features
        const store = { storeId, storeTitle, storeDescription, storeFeatures}

        callback(store)
       
          this.props.history.push(`/store`);
        }
      )
      .catch(err => this.displayError(err));
  }
  
  render(){

    const storeFeatures = this.state.storeFeatures.value
    let features
    if(storeFeatures){
      features = storeFeatures.map((feature,i) => {
        const id = feature.featureId
        const name = feature.featureName
        const faCode = feature.featureFaCode
        return(
          <div 
            key={`feature-set-${id}`}
            className={`admin-store-feat ${feature.touched && this.validateStoreFeature(id) ? 'form-error' : ''}`}
          >
            <label htmlFor={`feature-name-${id}`}>Name:</label>
            <input
              type='text'
              name={`feature-name-${id}`} 
              id={`feature-name-${id}`}
              onChange={e => this.updateStoreFeature(e.target.value, id, 'name')}
              value={name}
            />   

            <label htmlFor={`feature-faCode-${id}`}>Font Awesome Code:</label>
            <input
              type='text'
              name={`feature-faCode-${id}`}
              id={`feature-faCode-${id}`}
              onChange={e => this.updateStoreFeature(e.target.value, id, 'faCode')}
              value={faCode}
            />
            <button className='delete-feature-button'
              onClick={(e) => this.deleteFeature(e, id)}
            >
            Delete
            </button>
          </div>  
        )   
      })
    }

    return (
      <SimpleProductContext.Consumer>
        {(context) => (
          <div className='AdminStore'>
          <AdminHeader {...this.props} header={'store'}/>
            <form className='store-form' onSubmit={e => this.handleSubmit(e, context.updateStore)}>
              <label htmlFor='storeTitle'>Store title:</label>
              <input 
                  type='text'
                  name='storeTitle' 
                  id='storeTitle'
                  onChange={e => this.updateStoreTitle(e.target.value)}
                  value={this.state.storeTitle.value}
                  className={`${this.state.storeTitle.touched && this.validateStoreTitle() ? 'form-error' : ''}`}>
              </input>
        
              <label htmlFor='storeDescription'>Store description:</label>
              <textarea 
                  name='storeDescription' 
                  id='storeDescription'
                  onChange={e => this.updateStoreDescription(e.target.value)}
                  value={this.state.storeDescription.value}
                  className={`${this.state.storeDescription.touched && this.validateStoreDescription() ? 'form-error' : ''}`}>
              </textarea>

              <fieldset className='admin-store-features'>
                <legend>Store features:</legend>
                {features}
                {/* Add up to 6 store features */}
                <br/>
                <label><i>Add up to 6 features</i></label>
                <button className='add-feature-button'
                  onClick={(e) => this.addFeature(e)}
                  disabled={this.state.storeFeatures.value.length >= 6 ? true : false
                  }
                >
                Add Feature
                </button>
              </fieldset>

              <div className='admin-store-btns'>    
                <button 
                    type='submit'
                    disabled={
                        this.validateStoreTitle() ||
                        this.validateStoreDescription() ||
                        this.state.error
                    }
                >Save
                </button>
                <button type='reset'
                  onClick={() => this.props.history.push('/store')}
                >Cancel
                </button>
              </div>  
              
              <div>
                  {this.state.storeTitle.touched && this.validateStoreTitle()}
                  {this.state.storeDescription.touched && this.validateStoreDescription()}
                  {this.state.error ? <p className='form-error-msg'>{'Enter store feature. This field is required'}</p> : '' }
              </div> 
          </form>
          </div>       
        )}
      </SimpleProductContext.Consumer>
    )
    
  }

}

export default AdminStore