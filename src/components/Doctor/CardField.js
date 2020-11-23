import React from 'react';

const CardField = ({ key, value }) => {
  return (
    <div className=' row' style={{ fontSize: '2em' }}>
      <div className='col s12 m6 l6'>{key}</div>
      <div className='col s1 l1 m1 hide-on-small-only'> : </div>
      <div className='grey-text col s12 m5 l5'>{value}</div>
    </div>
  );
};

export default CardField;
