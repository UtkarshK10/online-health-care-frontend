import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import StripeCheckout from 'react-stripe-checkout';
import Card from '../components/Card';
import axios from '../axios/axios';

const Payment = () => {
  const [credit, setAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  const { auth } = useContext(AuthContext);

  const key = process.env.REACT_APP_STRIPE_KEY;
  const handleToken = (token, addresses) => {
    console.log(token, addresses);
  };
  const data = [
    { amount: 100, photo: 'https://www.finance-watch.org/wp-content/uploads/2018/08/money-supply-1600x1067.jpg' },
    { amount: 200, photo: 'https://p1.pxfuel.com/preview/377/271/771/money-dollar-bill-bills-paper-money.jpg' },
    { amount: 500, photo: 'https://capestylemag.com/wp-content/uploads/2020/02/bank-number-usa-bills-dollar_1232-3931.jpg' },
    { amount: 1000, photo: 'https://bgfons.com/uploads/money/money_texture1386.jpg' }
  ]

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: {
            'api-token': auth.token
          }
        })
        setUserDetails(res.data);
      } catch (e) {
        const { response } = e;
        const { request, ...errorObject } = response;
        console.log(errorObject);
      }
    }
    getCurrentUser();
  }, [auth.token]);


  return (
    <div className='container'>
      {' '}
      <div className='row' style={{ margin: '10px 0px 10px 0px' }}>
        {credit !== 0 && (
          <h4>
            Pay <span className='ptcolour'>&#8377; {credit}</span> to complete the
            transaction
          </h4>
        )}
      </div>
      <div className='row' style={{ margin: '10px 0px 10px 0px' }}>
        {credit === 0 && <h4>Please select an amount</h4>}
      </div>
      <div className='row'>
        {data.map(d => (
          <div key={d.amount} className='col s12 m6 l3'>
            <Card
              credit={credit}
              setAmount={setAmount}
              amount={d.amount}
              photo={d.photo}
            />
          </div>
        ))}
      </div>
      <div className='row'>
        {credit !== 0 && (
          <StripeCheckout currency="INR" amount={credit * 100}
            name={userDetails.name} email={userDetails.email} label="hey" description="Payment to add Credits" image="https://bgfons.com/uploads/money/money_texture1386.jpg" stripeKey={key} token={handleToken}>
            <button className='btn btn-large pcolour btn-register waves-effect waves-light'>
              Pay
              <i className='material-icons right'>check_circle</i>
            </button>
          </StripeCheckout>
        )}
      </div>
    </div>
  );
};

export default Payment;
