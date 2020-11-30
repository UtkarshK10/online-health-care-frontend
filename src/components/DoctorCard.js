import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = (props) => {
  const {
    name,
    photo,
    appointment,
    experience,
    speciality,
    showLink,
    id,
  } = props;

  const handleChange = (e) => {
    e.preventDefault();
    appointment(id);
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
        <span className='card-title ptcolour' style={{ fontWeight: '600' }}>
          {name}
        </span>
        <p>
          <span style={{ fontWeight: '600' }}>Experience : </span>
          {experience}
        </p>
        <p>
          <span style={{ fontWeight: '600' }}>Speciality : </span>
          {speciality}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
