import React, { useState, useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import ReactSpinner from '../ReactSpinner';
import queryString from 'query-string';
import axios from '../../axios/axios';

const DoctorMail = (props) => {
  const history = useHistory();
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
      .catch((e) => {
        setLoading(false);
      });
  };
  // if (!receiver) {
  //     history.replace('/doctors')
  // }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 l8 offset-l2 offset-m2'>
          <div id=''>
            <form
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
                    Email Subject
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <textarea
                    name='body'
                    value={emailData.body}
                    onChange={handleInputChange}
                    id='body'
                    className='materialize-textarea'
                  ></textarea>
                  <label htmlFor='body' className='active font-app'>
                    Email body
                  </label>
                </div>
              </div>
              <div className='row'>
                {!loading && (
                  <div className='input-field'>
                    <button className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
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
      {msg && <span>{msg}</span>}
    </div>
  );
};

export default DoctorMail;
