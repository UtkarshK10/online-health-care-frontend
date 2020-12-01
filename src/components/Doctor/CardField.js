import React from 'react';

const CardField = ({ keyName, value }) => {
  return (
    <div className=' row' style={{ fontSize: '1.5em' }}>
      <div className='col s12 m6 l6'>{keyName}</div>
      <div className='col s1 l1 m1 hide-on-small-only'> : </div>
      <div className='text-secondary col s12 m5 l5'>{value}</div>
    </div>
  );
};

export default CardField;
