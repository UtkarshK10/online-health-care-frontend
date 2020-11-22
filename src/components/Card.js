import React from 'react';

const Card = (props) => {

  const { amount, photo, setAmount, credit } = props;
  const selectCard = () => {
    setAmount(amount);
  };
  let classD = '';
  if (credit === amount) {
    classD = 'activeD';
  }
  return (
    <div className={`card click ${classD}`} onClick={selectCard}>
      <div className='card-image'>
        <img src={photo} alt='money' className='ratio' />
      </div>
      <div className='card-content'>
        <p className='card-title amount'>&#8377; {amount}</p>
      </div>
      <div className='card-content'>
        <p>
          You will get <b className='stcolour'>{amount / 4}</b> credits !!
        </p>
      </div>
    </div>
  );
};

export default Card;
