import React from 'react';

const PatientCountCard = ({ title, count, icon }) => {
  return (
    <div className='card hoverable bgsecondary'>
      <div className='card-title'>
        {title[0].toUpperCase() + title.slice(1)}
      </div>
      <img src={icon} alt={title} style={{ width: '20px' }} />
      <div className='card-description'>{count}</div>
    </div>
  );
};
export default PatientCountCard;
