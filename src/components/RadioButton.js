import React from 'react';

export default function RadioButton({ name, val1, val2, handleChange, curr }) {
  return (
    <div className='input-field' onChange={handleChange}>
      <div className='col s12 m3 l3 offset-l3 offset-m3'>
        <label>
          <input
            className='with-gap'
            name={name}
            type='radio'
            value={val1}
            defaultChecked={curr === val1}
          />
          <span className='font-app'>{val1}</span>
        </label>
      </div>
      <div className='col s12 m3 l3'>
        <label>
          <input
            className='with-gap'
            name={name}
            type='radio'
            defaultChecked={curr === val2 || curr === 'on'}
          />
          <span className='stcolour'>{val2}</span>
        </label>
      </div>
    </div>
  );
}
