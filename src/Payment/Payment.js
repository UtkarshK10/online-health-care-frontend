import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Card from '../components/Card';

const Payment = () => {
  const [credit, setAmount] = useState(0);
  const key =
    'pk_test_51HoEWKKsKWe4rJ2MVPlrEpLYnDg0Xj61tPLH1yNOri4Ml9lh6mPDj76RTxBAqKYow1KsK4V8jR45xKmU2HTe5lWs00CwYfjimX';
  const handleToken = (token, addresses) => {
    console.log(token, addresses);
  };
  return (
    <div className='container'>
      {' '}
      <div className='row' style={{ margin: '10px 0px 10px 0px' }}>
        {credit !== 0 && (
          <h4>
            Pay <span className='ptcolour'>Rs {credit}</span> to complete the
            transaction
          </h4>
        )}
      </div>
      <div className='row' style={{ margin: '10px 0px 10px 0px' }}>
        {credit === 0 && <h4>Please select an amount</h4>}
      </div>
      <div className='row'>
        <div className='col s12 m6 l3'>
          <Card
            credit={credit}
            setAmount={setAmount}
            amount='100'
            photo='https://www.finance-watch.org/wp-content/uploads/2018/08/money-supply-1600x1067.jpg'
          />
        </div>
        <div className='col s12 m6 l3'>
          <Card
            credit={credit}
            setAmount={setAmount}
            amount='200'
            photo='https://p1.pxfuel.com/preview/377/271/771/money-dollar-bill-bills-paper-money.jpg'
          />
        </div>
        <div className='col s12 m6 l3'>
          <Card
            credit={credit}
            setAmount={setAmount}
            amount='500'
            photo='https://capestylemag.com/wp-content/uploads/2020/02/bank-number-usa-bills-dollar_1232-3931.jpg'
          />
        </div>
        <div className='col s12 m6 l3'>
          <Card
            credit={credit}
            setAmount={setAmount}
            amount='1000'
            photo='https://bgfons.com/uploads/money/money_texture1386.jpg'
          />
        </div>
      </div>
      <div className='row'>
        {credit !== 0 && (
          <StripeCheckout stripeKey={key} token={handleToken}>
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
