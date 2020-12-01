import React from 'react';
import CardField from './CardField';
const PatientDetailsCard = ({ currPatient, updateState }) => {
  const keyNames = [
    'Age',
    'Gender',
    'Oxygen Level',
    'Heart Rate',
    'Body Temperature',
    'Are you having difficulties in breathing?',
    'Are you facing any common symptoms like cold?',
    'Were you in contact with person who had Cold / Fever / Covid since the past 14 days?',
    'Have you travelled anywhere internationally across states since the last 14 days?',
    'Major Diseases in the past?',
    'Possibility of contact?',
  ];
  const apply = [
    {
      name: 'apply',
      label:
        'I have recently interacted or lived with someone who has tested positive for COVID - 19',
      value: '1',
    },
    {
      name: 'apply',
      label:
        'I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear',
      value: '2',
    },
    { name: 'apply', label: 'None of the above', value: 'none' },
  ];

  const getApply = () => {
    const temp = currPatient.might_be_causing_condition.split(', ');
    let res = '';
    temp.forEach((ele) => (res += apply[ele - 1]['label'] + ', '));
    return res;
  };

  const changeRadioState = (val) => {
    if (val === 'on') {
      return 'No';
    }
    return val;
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m10 l10 offset-m1 offset-l1'>
          <div className='card shadow-patient-card bgsecondary'>
            <div className='card-content'>
              <span
                className='card-title text-primary'
                style={{ fontSize: '2.5em', fontWeight: '500' }}
              >
                {currPatient.patient_name}
              </span>
              <br />
              <br />
              <div className='justify-text'>
                <CardField keyName={keyNames[0]} value={currPatient.age} />
                <CardField keyName={keyNames[1]} value={currPatient.gender} />
                <CardField
                  keyName={keyNames[2]}
                  value={currPatient.oxygen_level}
                />
                <CardField keyName={keyNames[3]} value='78' />
                <CardField
                  keyName={keyNames[4]}
                  value={currPatient.temperature}
                />
                <CardField
                  keyName={keyNames[5]}
                  value={changeRadioState(currPatient.breathing_difficulty)}
                />
                <CardField keyName={keyNames[6]} value={currPatient.symptoms} />
                <CardField
                  keyName={keyNames[7]}
                  value={changeRadioState(currPatient.contact_with_others)}
                />
                <CardField
                  keyName={keyNames[8]}
                  value={changeRadioState(currPatient.past_travel)}
                />
                <CardField
                  keyName={keyNames[9]}
                  value={currPatient.prior_or_current_disease}
                />
                <CardField keyName={keyNames[10]} value={getApply()} />
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateState(false);
            }}
            className='btn btn-large pcolour btn-register waves-effect waves-light glow'
          >
            <i className='material-icons left'>arrow_back</i>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsCard;
