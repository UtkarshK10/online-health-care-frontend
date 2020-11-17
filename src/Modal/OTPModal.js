import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

const OTPModal = () => {
  const [firstName, setOTP] = useState('');
  const history = useHistory();
  const onSubmit = () => {
    if (firstName === '') {
      M.toast({ html: 'Please enter a OTP' });
    } else {
      history.push('/');
      //clear fields
      setOTP('');
    }
  };

  return (
    <div id='OtpModal' className='modal'>
      <div className='modal-content'>
        <h4>Enter the OTP</h4>
        <div className='row'>
          <br />
          <div className='input-field'>
            <input
              type='text'
              name='OTP'
              value={firstName}
              onChange={(e) => setOTP(e.target.value)}
            />
            <label htmlFor='OTP' className='active'>
              OTP
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close purple waves-effect btn'
        >
          Submit
        </a>
      </div>
    </div>
  );
};

export default OTPModal;
