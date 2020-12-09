import React, { useState, useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { AuthContext } from '../../contexts/auth-context';
import ReactSpinner from '../ReactSpinner';
import queryString from 'query-string';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from '../../axios/axios';

const DoctorMail = (props) => {
  const { auth } = useContext(AuthContext);
  const [time, onChange] = useState(new Date());
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const searchString = queryString.parse(props?.location?.search);
  const receiver = searchString?.email;
  const record_id = searchString?.id;

  const handleChange = (val) => {
    onChange(val);
  };
  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      time: time.getTime(),
      receiver,
      subject: emailData.subject,
      body: emailData.body,
      meetingTime: time.toLocaleString(),
      record_id,
    };
    axios
      .post('/api/records/schedule', data, {
        headers: {
          'dapi-token': auth.token,
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        setLoading(false);
        const d = new Date(res.data.msg).toLocaleString();
        setMsg(`Appointment confirmed at: ${d}`);
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
        <div className='col s12 m8 l8 offset-l2 offset-m2'>
          <div id=''>
            <form
              autoComplete='off'
              onSubmit={handelSubmit}
              className='padding-form shadow'
              noValidate
            >
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={receiver}
                    id='receiver_email'
                    type='text'
                    name='receiver_email'
                    className='validate'
                    readOnly
                    required
                  />
                  <label htmlFor='receiver_email' className='active font-app'>
                    Receiver Email
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <DateTimePicker
                    className='date-picker'
                    onChange={handleChange}
                    value={time}
                    minDate={new Date()}
                    required
                    showLeadingZeros={true}
                  />
                  <label htmlFor='meeting_time' className='active font-app'>
                    Meeting Time
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={emailData.subject}
                    onChange={handleInputChange}
                    id='subject'
                    type='text'
                    name='subject'
                    className='validate'
                    required
                  />
                  <label htmlFor='subject' className='active font-app'>
                    Subject
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    name='body'
                    value={emailData.body}
                    onChange={handleInputChange}
                    id='body'
                    type='text'
                    className='materialize-textarea'
                  />
                  <label htmlFor='body' className='active font-app'>
                    Body
                  </label>
                </div>
              </div>
              <div className='row'>
                {!loading && (
                  <div className='input-field'>
                    <button
                      className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                      style={{ zIndex: 0 }}
                    >
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
      <h4>{msg && <span>{msg}</span>}</h4>
    </div>
  );
};

export default DoctorMail;
