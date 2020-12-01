import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import StripeCheckout from 'react-stripe-checkout';
import Card from '../components/Card';
import axios from '../axios/axios';
import { updateLocalStorage } from '../utils/helper';
import M from 'materialize-css/dist/js/materialize.min.js';

const Payment = () => {
  const [credit, setAmount] = useState(0);
  const [msg, setMsg] = useState(null);

  const { auth, setAuth } = useContext(AuthContext);

  const key = process.env.REACT_APP_STRIPE_KEY;
  const handleToken = (token, addresses) => {
    const data = { credit };
    axios
      .put('/api/users/payment', data, {
        headers: {
          'api-token': auth.token,
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.data.msg);
          setAuth({ ...auth, credits: res.data.new_credits });
          updateLocalStorage({ ...auth, credits: res.data.new_credits });
          setAmount(0);
        }
      })
      .catch((err) => {
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.data?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  };
  const data = [
    {
      amount: 500,
      photo:
        'https://www.finance-watch.org/wp-content/uploads/2018/08/money-supply-1600x1067.jpg',
    },
    {
      amount: 1000,
      photo:
        'https://p1.pxfuel.com/preview/377/271/771/money-dollar-bill-bills-paper-money.jpg',
    },
    {
      amount: 2000,
      photo:
        'https://capestylemag.com/wp-content/uploads/2020/02/bank-number-usa-bills-dollar_1232-3931.jpg',
    },
    {
      amount: 5000,
      photo: 'https://bgfons.com/uploads/money/money_texture1386.jpg',
    },
  ];

  return (
    <div className='container'>
      <div className='row'>
        {credit !== 0 && (
          <h4 className='h4-style'>
            Pay <span className='highlight'>&#8377; {credit}</span> to complete
            the transaction
          </h4>
        )}
      </div>
      <div className='row'>
        {credit === 0 && <h4 className='h4-style'>Please select an amount</h4>}
      </div>
      <div className='row'>
        {data.map((d) => (
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
          <StripeCheckout
            allowRememberMe
            currency='INR'
            amount={credit * 100}
            name={auth?.name}
            email={auth?.email}
            description='Payment to add Credits'
            image={auth?.profile_image}
            stripeKey={key}
            token={handleToken}
          >
            <button className='btn btn-large pcolour btn-register waves-effect waves-light glow'>
              Pay
              <i className='material-icons right'>check_circle</i>
            </button>
          </StripeCheckout>
        )}

        {msg && credit === 0 && <h4 className='success'>{msg}</h4>}
      </div>
    </div>
  );
};

export default Payment;
