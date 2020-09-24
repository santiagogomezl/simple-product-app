import React, {Component, useCallback} from 'react';
import SimpleProductContext from '../SimpleProductContext'
import {Link} from 'react-router-dom';
import './CompareProducts.css';

class CompareProducts extends Component{
    static contextType = SimpleProductContext

    displayTable(compare){
        let barbellData = []
        compare.length > 0 
        ? barbellData = [
            <tr>
                <th></th>
                <th>Weight</th>
                <th>Lenght</th>
                <th>Diameter</th>
                <th>Price</th>
            </tr>
        ]  
        : barbellData = []
        compare.map(barbell => {
        barbellData = [...barbellData,
                <tr>
                    <td>
                        <Link to={`barbell/${barbell.name.toLowerCase()}`} onClick={this.context.clearProducts}><span className="compare-product-name">{barbell.name}</span></Link>
                        <img className="compare-logo" src={`../img/${barbell.logo}`}></img>
                    </td>
                    <td>{`${barbell.weight}lb`}</td>
                    <td>{`${barbell.lenght}ft`}</td>
                    <td>{`${barbell.diameter}''`}</td>
                    <td>{`$${barbell.price}`}</td>
                </tr>
            ]
        })
        return barbellData
    }

    render(){
    return (
        <SimpleProductContext.Consumer>
            {(context) => (
            <div className="CompareProducts">
                <table className="compare-table">
                    {this.displayTable(context.compare)}
                </table> 
            </div>
            )}
        </SimpleProductContext.Consumer>
    );
  }

}

export default CompareProducts;