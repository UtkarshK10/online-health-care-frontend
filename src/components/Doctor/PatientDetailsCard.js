import React from 'react';
import CardField from './CardField';
const PatientDetailsCard = ({ currPatient }) => {
  console.log(currPatient);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 l8 offset-m2 offset-l2'>
          <div className='card'>
            <div class='card-content'>
              <span
                class='card-title ptcolour'
                style={{ fontSize: '2.5em', fontWeight: '500' }}
              >
                {currPatient.patient_name}
              </span>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsCard;
