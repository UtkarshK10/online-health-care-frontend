import React from 'react';
const AboutUsCard = ({ image, name, description, link }) => {
  return (
    <div className='card bgsecondary developer'>
      <div className='card-image'>
        <img
          src={image}
          alt='developer'
          style={{
            borderRadius: '50%',
            padding: '25px',
          }}
        />

        <a
          href={link}
          className='halfway-fab btn-floating scolour pulse'
          target='_blank'
          rel='noreferrer noopener'
        >
          <i className='material-icons'>arrow_forward</i>
        </a>
      </div>
      <div className='card-content'>
        <div className='card-title highlight'>{name.toUpperCase()}</div>
        <p className='card-description' style={{ fontStyle: 'italic' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutUsCard;
