import React from 'react';

const BotButton = ({ botopen }) => {
  return (
    <div className='fixed-action-btn' onClick={botopen}>
      <a
        href='#chat-modal'
        className='btn-floating btn-large pcolour darken-2 modal-trigger'
      >
        <i className='large material-icons'>person</i>
      </a>
    </div>
  );
};

export default BotButton;
