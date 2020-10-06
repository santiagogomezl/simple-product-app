import React, {Component} from 'react';
import SimpleProductContext from '../SimpleProductContext'
import {Link} from 'react-router-dom';
import './CompareProducts.css';

class CompareProducts extends Component{
    static contextType = SimpleProductContext

    componentDidMount(){
        if(this.props.compare.length < 1){
            this.props.history.push('/');
        }
    }

    displayTable(compare){
        let barbellData = []
        compare.length > 0 
        ? barbellData = [
            <ul  key={'thead'}>
                    <li></li>
                    <li>Weight</li>
                    <li>Lenght</li>
                    <li>Diameter</li>
                    <li>Price</li>
            </ul>
        ]  
        : barbellData = []
        compare.map(barbell => {
        barbellData = [...barbellData,
                <ul key={`tr-${barbell.id}`}>
                        <li>
                            <Link to={`barbell/${barbell.name.toLowerCase()}`} onClick={this.context.clearProducts}><span className="compare-product-name">{barbell.name}</span></Link>
                            <img className="compare-logo" alt={'barbell logo'} src={`../img/${barbell.logo}`}></img>
                        </li>
                        <li>{`${barbell.weight}lb`}</li>
                        <li>{`${barbell.lenght}ft`}</li>
                        <li>{`${barbell.diameter}''`}</li>
                        <li>{`$${barbell.price}`}</li>
                </ul>
            ]
        })
        return [barbellData]
    }

    render(){
    return (
        <SimpleProductContext.Consumer>
            {(context) => (
            <div className="CompareProducts">
                <div className="compare-table">
                    {this.displayTable(context.compare)}
                </div> 
            </div>
            )}
        </SimpleProductContext.Consumer>
    );
  }

}

export default CompareProducts;