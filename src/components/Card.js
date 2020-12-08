import React from 'react';
import money from '../assets/money.png';

const Card = (props) => {
  const BASE_PRICE = 500;
  const { amount, photo, setAmount, credit } = props;
  const selectCard = () => {
    setAmount(amount);
  };
  let classD = '';
  if (credit === amount) {
    classD = 'activeD';
  }
  const getCredits = (amount) => {
    return amount * 0.4 + (amount - BASE_PRICE) * 0.1;
  };
  return (
    <div className={`card bgsecondary click ${classD}`} onClick={selectCard}>
      <div className='card-image'>
        <img src={photo} alt='money' className='ratio' />
      </div>
      <div className='card-content'>
        <p className='card-title amount'>&#8377; {amount}</p>
      </div>
      <div className='card-content'>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>
            You will get <b>{getCredits(amount)}</b>
          </span>
          <img
            src={money}
            alt='money'
            style={{ width: '20px', marginLeft: '3px' }}
          />
        </p>
      </div>
    </div>
  );
};

export default Card;
