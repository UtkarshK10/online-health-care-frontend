import React from 'react';
import RatingStar from './RatingStar';
import Basket from '../../assets/basket.png';

const ProductCard = ({ Product }) => {
  const { id, name, price, description, imageUrl, rating } = Product;
  const shortText = (description) => {
    const maxChar = 200;
    if (description.length > maxChar) {
      description = description.substring(0, maxChar) + ' . . .';
      return description;
    }
    return description;
  };
  return (
    <div className='col s12 m6 l4'>
      <div className='card '>
        <div className='card-image'>
          <img src={imageUrl} alt={id} style={{ height: '200px' }} />
        </div>
        <br />
        <div className='left-align spaceA'>
          <div
            className='card-title'
            style={{
              fontSize: '1.3em',
            }}
          >
            {shortText(name)}
          </div>
          <div
            className='card-title  grey-text'
            style={{
              fontSize: '1em',
            }}
          >
            {shortText(description)}
          </div>
        </div>
        <div style={{ marginLeft: '15px' }}>
          <RatingStar val={rating} />
        </div>

        <div className='row' style={{ marginTop: '20px' }}>
          <div
            className='col s6 m4 l  4'
            style={{
              marginLeft: '15px',

              textAlign: 'left',
              fontSize: '22px',
            }}
          >
            &#8377; {price}
          </div>
          <div className='col offset-l1 offset-m1 s6 m6 l6 '>
            <img
              src={Basket}
              alt=''
              style={{ width: '30px', marginLeft: '100px', cursor: 'pointer' }}
            />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
