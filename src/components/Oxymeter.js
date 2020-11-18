import React, { useState, useEffect } from 'react';
import DropZoneArea from './FileUpload';
import Spinner from './Spinner';

const Oxymeter = () => {
  const [oxylevel, setlevel] = useState('');
  const [loading, setloading] = useState(false);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m12 l12'>
          <h3>Upload the video below</h3>
          {!loading && <DropZoneArea />};{loading && <Spinner />};
          {oxylevel !== '' && (
            <h4>
              Your blood oxygen level is{' '}
              <span className='ptcolour'>{oxylevel + ' %'}</span>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oxymeter;
