import React from 'react';

export default function Checkbox({ title, data, handleChange, curr }) {
  let classD = '';
  if (data.length === 4) classD = 'm2 l3';
  if (data.length === 5) classD = 'm4 l4';
  return (
    <div>
      <p className='font-app row'>{title}</p>
      {data.map((d, idx) => (
        <p key={d.value} className={`col s12 ${classD}`}>
          <label>
            <input
              defaultChecked={d.value === curr[idx]}
              onChange={handleChange}
              name={d.name}
              value={d.value}
              type='checkbox'
              className='filled-in'
            />
            <span className='text-secondary'>{d.label}</span>
          </label>
        </p>
      ))}
    </div>
  );
}
