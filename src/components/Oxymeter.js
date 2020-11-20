import React, { useState, useContext, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import ReactSpinner from './ReactSpinner';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';

const Oxymeter = () => {
  const [oxylevel, setLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const handleChange = async (file) => {
    if (file.length > 0) {
      const formData = new FormData();
      formData.append('file', file[0]);

      let res;
      setLoading(true);
      try {
        res = await axios.post('/api/users/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-token': auth.token,
          },
        });
        setLevel(res.data.spo2);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m12 l12'>
          <h3>Upload the video below</h3>
          {!loading && (
            <DropzoneArea
              onChange={handleChange}
              acceptedFiles={[
                'video/mp4',
                'video/mkv',
                'video/m4v',
                'video/wav',
              ]}
              maxFileSize={20971520}
              filesLimit={1}
            />
          )}
          {loading && <ReactSpinner size={150} />}
          {oxylevel > 0 && (
            <h4>
              Your blood oxygen level is{' '}
              <span className='ptcolour'>{+oxylevel.toFixed(2) + ' %'}</span>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oxymeter;
