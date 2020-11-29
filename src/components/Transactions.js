import React, { useState, useContext, useEffect } from 'react';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import noTransaction from '../assets/no-transaction.svg'

// const fakeData = [
//   {
//     id: '1',
//     done_to: 'Bought Credits',
//     amount: 200,
//     transaction_date: '28/11/2020',
//   },
//   {
//     id: '2',
//     done_to: 'Purchase Medicines',
//     amount: 100,
//     transaction_date: '28/11/2020',
//   },
// ];

const Transcations = () => {
  const [transactions, setTransactions] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/transactions/show_transactions', {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {

        setLoading(false);
        setTransactions(res.data.details)
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [auth?.token]);

  if (!loading && transactions?.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2>No transaction records found!</h2>
            <img src={noTransaction} alt="No Transaction Records" style={{ width: "300px" }} />
          </div>
        </div>
      </div>
    )
  }

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
              key={transaction.transaction_id}
              className={
                transaction.done_to.includes('Bought') ? 'green-text' : 'red-text'}>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.done_to}</td>
              <td>{transaction.amount} cr.</td>
              <td>
                {transaction.transaction_date.toString().replace('GMT', 'IST')}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transcations;
