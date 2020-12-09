import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from './Shopping/RatingStar';
import money from '../assets/money.png';

const DoctorCard = (props) => {
  const {
    name,
    photo,
    appointment,
    experience,
    speciality,
    consulation_fee,
    showLink,
    id,
    doc_rating,
  } = props;

  const handleChange = (e) => {
    e.preventDefault();
    appointment(id, consulation_fee);
  };

  // let classD = '';
  // if (credit === amount) {
  //     classD = 'activeD';
  // }
  return (
    <div className='card  hoverable round bgsecondary'>
      <div className='card-image'>
        <img height='300' src={photo} alt='#' />
        {showLink && (
          <Link
            onClick={handleChange}
            to='#'
            className='halfway-fab btn-floating scolour pulse'
          >
            <i className='material-icons'>arrow_forward</i>
          </Link>
        )}
      </div>
      <div className='card-content'>
        <span className='card-title text-primary' style={{ fontWeight: '600' }}>
          {name}
        </span>
        <p style={{ fontSize: '1.1rem' }}>
          <span style={{ fontWeight: '600' }}>Experience : </span>
          {experience}{' '}
          {experience.toString().toLowerCase().includes('year') ? '' : 'years'}
          <br />
          <span style={{ fontWeight: '600' }}>Speciality : </span>
          {speciality}
          <br />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontWeight: '600', marginRight: '5px' }}>
              Fee :{' '}
            </span>
            {Math.ceil(consulation_fee)}
            <img
              src={money}
              alt='money'
              style={{ width: '18px', marginLeft: '5px' }}
            />
          </div>
          <span className='right' style={{ margin: '15px 0' }}>
            <RatingStar val={doc_rating} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
