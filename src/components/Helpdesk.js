import React, { useState, useContext } from 'react';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import ReactSpinner from './ReactSpinner';
import M from 'materialize-css/dist/js/materialize.min.js';

const Helpdesk = ({ isDoctor }) => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    subject: '',
    message: '',
  });

  const URL = isDoctor ? '/api/doctors/help' : '/api/users/help';
  const headers = isDoctor
    ? { 'dapi-token': auth?.token }
    : { 'api-token': auth?.token };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (data.subject === '') {
      return M.toast({ html: 'Please enter a subject' });
    }
    if (data.message === '') {
      return M.toast({ html: 'Please enter a body' });
    }

    axios
      .post(`${URL}`, data, {
        headers,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          M.toast({
            html: 'We have got your complaint, we will contact you soon!',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  };
  return (
    <div className='container'>
      <div className='row'>
        <h3>Submit your complaint</h3>
      </div>
      <div className='row'>
        <div className='col s12 m8 l6 offset-l3 offset-m2'>
          <div id=''>
            <form
              onSubmit={handleSubmit}
              className='padding-form glow'
              autoComplete='off'
            >
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={data.subject}
                    onChange={handleChange}
                    id='subject'
                    type='text'
                    name='subject'
                    className='validate'
                  />
                  <label htmlFor='subject' className='font-app'>
                    Subject
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={data.message}
                    onChange={handleChange}
                    id='message'
                    type='text'
                    name='message'
                    className='validate'
                  />
                  <label htmlFor='message' className='font-app'>
                    Body
                  </label>
                </div>
              </div>{' '}
              <div className='row'>
                {!loading && (
                  <div className='input-field'>
                    <button className='btn btn-large pcolour btn-register waves-effect waves-light glow'>
                      Submit
                      <i className='material-icons right'>check_circle</i>
                    </button>
                  </div>
                )}
                {loading && <ReactSpinner size={25} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helpdesk;
