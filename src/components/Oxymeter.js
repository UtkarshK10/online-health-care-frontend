import React, { useState, useContext, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Spinner from './Spinner';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';

const Oxymeter = () => {
  const [oxylevel, setLevel] = useState('');
  const [loading, setLoading] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (loading)
      setShowSpinner(true);
    else if (loading === false) setShowSpinner(false);
  }, [loading]);

  const handleChange = async file => {
    if (file.length > 0) {
      const formData = new FormData();
      formData.append('file', file[0]);

      let res;
      setLoading(true);
      try {

        res = await axios.post('/api/users/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-token': auth.token
          }
        })
        setLevel(res.data.spo2);
      } catch (e) {

        console.log(e);
      }
      setLoading(false);
    }
  }
  if (showSpinner) {
    return <Spinner />
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 m12 l12'>
            <h3>Upload the video below</h3>
            <DropzoneArea
              onChange={handleChange}
              acceptedFiles={['video/mp4', 'video/mkv', 'video/m4v', 'video/wav']}
              maxFileSize={20971520}
              filesLimit={1}
            />
            {oxylevel && (
              <h4>
                Your blood oxygen level is{' '}
                <span className='ptcolour'>{oxylevel + ' %'}</span>
              </h4>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Oxymeter;
