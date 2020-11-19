import React from 'react';
import Male from '../assets/male.jpg';
import Female from '../assets/female.jpg';

const CustomG = (props) => {
  const { sex, gender, updateGender } = props;
  const update = () => {
    updateGender(sex);
  };
  let classDy = '';
  if (sex === gender) {
    classDy = 'innershadow';
  }
  return (
    <div className={`card ${classDy}`}>
      <div className='card-image padG'>
        <img
          src={sex === 'male' ? Male : Female}
          alt={sex[0].toUpperCase()}
          onClick={update}
        />
      </div>
    </div>
  );
};

export default CustomG;
