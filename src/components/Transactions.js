import React, { useState, useContext, useEffect } from 'react';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';

const fakeData = [
  {
    id: '1',
    done_to: 'Bought Credits',
    amount: 200,
    transaction_date: '28/11/2020',
  },
  {
    id: '2',
    done_to: 'Purchase Medicines',
    amount: 100,
    transaction_date: '28/11/2020',
  },
];

const Transcations = () => {
  const [transactions, setTransactions] = useState(fakeData);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get('/api/transactions', {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {})
      .catch((e) => {});
  }, [auth?.token]);

  return (
    <div className='container'>
      <div className='row'>
        <h3>Your Transcations</h3>
      </div>
      <table className='responsive-table'>
        <thead>
          <tr>
            <th>Transcation Id</th>
            <th>Description</th> <th>Amount</th>
            <th className='material-icons'>schedule</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className={
                transaction.done_to.includes('Bought')
                  ? 'green-text'
                  : 'red-text'
              }
            >
              <td>{transaction.id}</td>
              <td>{transaction.done_to}</td>
              <td>{transaction.amount} cr.</td>
              <td>
                {transaction.transaction_date.toString().replace('GMT', 'IST')}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transcations;
