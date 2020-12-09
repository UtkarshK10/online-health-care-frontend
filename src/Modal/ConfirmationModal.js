import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
// import axios from '../axios/axios';
// import { AuthContext } from '../contexts/auth-context';
// import { updateLocalStorage } from '../utils/helper';

const ConfirmationModal = ({ propData }) => {
  const makescroll = () => {
    document.body.style.overflow = 'visible';
  };
  const closeInstance = () => {
    var elem = document.querySelector('.cmodal');
    var instance = M.Modal.init(elem, {
      dismissible: true,
      opacity: 0.7,
    });
    instance.close();
    makescroll();
    propData?.closeModal();
  };

  const handleSubmit = (cond) => {
    if (cond) {
      propData?.callback(propData?.id);
      closeInstance();
    } else {
      closeInstance();
    }
  };

  return (
    <div id='OtpModal' className='modal cmodal bgsecondary'>
      <div className='modal-content'>
        <div className='row'>
          <h5>{propData?.label}</h5>
        </div>
      </div>
      <div className='modal-footer bgsecondary'>
        <a
          href='#!'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(true);
          }}
          className='pcolour waves-effect btn secondary-content glow'
        >
          Okay
        </a>
        <a
          style={{ marginRight: '20px' }}
          href='#!'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(false);
          }}
          className='scolour waves-effect btn secondary-content'
        >
          Cancel
        </a>
      </div>
    </div>
  );
};

export default ConfirmationModal;
