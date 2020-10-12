import React, {Component} from 'react'
import SimpleProductContext from '../SimpleProductContext'
import './ProductDetail.css'

class ProductDetail extends Component{

    static defaultProps={
        images: '',
      }

    getImages(images){
        let imagesMarkup = []
        for(let i = 0; i < images.length; i++){
            imagesMarkup = [...imagesMarkup, <div key={`image-${i}`} className="image-container"><img src={`../img/${images[i]}`} alt="Barbell"></img></div>]
        }
        return imagesMarkup
    }

    render(){


    const { logo, weight, lenght, diameter, images, details, price} = this.props
    return (
        <SimpleProductContext.Consumer>
        {(context) => (
        <div className="ProductDetail">
            <div className="product-card">
                <div className="product-detail-logo">
                    <img src={`../img/${logo}`} alt="Logo Alt"></img>
                </div>

                <div className="product-info">
                    <ul>
                        <li>
                            <div>
                                <img className="detail-icon" src={`../img/icons/png/001-weight.png`} alt="Icon"></img>
                                <span>{weight}lb</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img className="detail-icon" src={`../img/icons/png/002-diameter.png`} alt="Icon"></img>
                                <span>{diameter}''</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img className="detail-icon" src={`../img/icons/png/003-ruler.png`} alt="Icon"></img>
                                <span>{lenght}ft</span>
                            </div>
                        </li>
                    </ul>
                    <p>{details}</p>
                    <div className="product-order">
                        <span>${price}</span>
                    </div>
                </div>
            </div>

            <div className="product-images">
                {this.getImages(images)}
            </div>
        </div>
        )}
        </SimpleProductContext.Consumer>
    )
  }

}

export default ProductDetail