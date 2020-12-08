import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import ReactSpinner from '../ReactSpinner';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import money from '../../assets/money.png';
// const Orders = [
//   {
//     id: '1',
//     name: 'Strepsils Lozenges Orange',
//     price: '285',
//     image_url:
//       'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1915&q=80',
//     quantity: 2,
//   },
//   {
//     id: '2',
//     name: 'Strepsils Lozenges Orange',
//     price: '500',
//     image_url:
//       'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
//     quantity: 1,
//   },
//   {
//     id: '3',
//     name: 'Strepsils Lozenges Orange',
//     price: '700',
//     image_url:
//       'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80',
//     quantity: 3,
//   },
// ];
const OrderDetails = (props) => {
  const searchString = queryString.parse(props.location.search);
  const { id } = searchString;
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const downloadInvoice = () => {
    history.push(`/shopping/invoice?id=${id}`);
  };
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/shopping/orders');
  };
  useEffect(() => {
    if (auth?.token) {
      setLoading(true);
      axios
        .get(`/api/orders/order_items/${+id}`, {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          setLoading(false);
          setOrderDetails(res.data.details);
        })
        .catch((err) => {
          setLoading(false);
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  }, [auth?.token, id]);

  if (loading) {
    return (
      <div className='container'>
        <ReactSpinner size='50px' />
      </div>
    );
  }

  return (
    <div className='container' style={{ paddingTop: '30px' }}>
      <ul className='collection with-header' style={{ marginTop: '0px' }}>
        <li className='collection-header bgcolor'>
          <div className='row'>
            <div className='col s12 m6 l6'>
              <h4 className='left-align'>Order #{searchString.id} Details</h4>
            </div>
            <div className='col s12 m3 l3 offset-m3 offset-l3'>
              <button
                className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                onClick={downloadInvoice}
              >
                Invoice
                <i className='material-icons right'>receipt</i>
              </button>
            </div>
          </div>
        </li>
        {orderDetails.map((orderDetail, idx) => (
          <React.Fragment key={idx}>
            <li className='row'>
              <div className='col s12 m3 l3'>
                <img
                  src={orderDetail?.image_url}
                  alt={orderDetail.name}
                  style={{
                    height: '150px',
                    width: '150px',
                    padding: '20px',
                    paddingRight: '0px',
                  }}
                  className='newsImage avatar'
                />
              </div>
              <div className='col s12 m5 l4'>
                <p style={{ fontSize: '1.8em', marginLeft: '0px' }}>
                  {orderDetail.name} <br />
                </p>
              </div>
              <div
                className='col s6 m4 l3  offset-l2'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p
                  className='ptcolour'
                  style={{
                    fontSize: '2.5em',
                    margin: '5px',
                    fontWeight: '400',
                    display: 'flex',
                    marginLeft: '22px',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {orderDetail.price}{' '}
                    <img
                      src={money}
                      alt='money'
                      style={{
                        width: '30px',
                        marginLeft: '7px',
                        marginTop: '3px',
                      }}
                    />
                  </span>
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className='btn btn-small black waves-effect'
                >
                  <span style={{ fontSize: '20px' }}>
                    {orderDetail.quantity}{' '}
                    {orderDetail.quantity === 1 ? ' unit' : ' units'}
                  </span>{' '}
                </button>
              </div>
            </li>
            <div className='divider'></div>
          </React.Fragment>
        ))}
      </ul>
      <div className='row'>
        <div className='input-field'>
          <button
            className='btn btn-large pcolour btn-register waves-effect waves-light hover'
            onClick={handleClick}
          >
            Go Back
            <i className='material-icons left'>arrow_back</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
