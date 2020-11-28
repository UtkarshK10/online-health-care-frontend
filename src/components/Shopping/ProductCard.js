import React, { useState, useContext } from 'react';
import RatingStar from './RatingStar';
import Basket from '../../assets/basket.png';
import { AuthContext } from '../../contexts/auth-context';
import axios from '../../axios/axios';
import ReactSpinner from '../ReactSpinner';
import M from 'materialize-css/dist/js/materialize.min.js';
import PrescriptionIcon from '../../assets/add-to-pre.png';

const ProductCard = ({ Product, Prescription, addToPrescription }) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const { id, name, price, description, image_url, rating } = Product;
  const shortText = (description) => {
    const maxChar = 200;
    if (description.length > maxChar) {
      description = description.substring(0, maxChar) + ' . . .';
      return description;
    }
    return description;
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { medicine_id: id, quantity: 1 };
    axios
      .put('/api/cart/add_to', data, {
        headers: {
          'api-token': auth?.token,
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        M.toast({ html: res.data.msg });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  const handleAddToPrescription = () => {
    const { id, name, description } = Product;
    addToPrescription({ id, name, description, instruction: '', quantity: 1 });
  };
  return (
    <div className='card '>
      <div className='card-image'>
        <img src={image_url} alt={id} style={{ height: '200px' }} />
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
          className='col s4 m4 l4'
          style={{
            marginLeft: '15px',

            textAlign: 'left',
            fontSize: '22px',
          }}
        >
          &#8377; {price}
        </div>
        <div className='col offset-l5 offset-m5 s4 m2 l2 offset-s3'>
          {auth?.token &&
            (loading ? (
              <ReactSpinner size='25px' />
            ) : !Prescription ? (
              <img
                onClick={handleAddToCart}
                src={Basket}
                alt=''
                style={{ width: '30px', cursor: 'pointer' }}
              />
            ) : (
              <img
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToPrescription();
                }}
                src={PrescriptionIcon}
                alt=''
                style={{ width: '30px', cursor: 'pointer' }}
              />
            ))}
        </div>
        <br />
      </div>
    </div>
  );
};

export default ProductCard;
