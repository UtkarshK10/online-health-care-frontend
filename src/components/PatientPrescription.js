import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import axios from '../axios/axios';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import noRecords from '../assets/no-record.svg';
import ReactSpinner from './ReactSpinner';
import FeedbackRating from './FeedbackRating';

const PatientPrescription = () => {
  const history = useHistory();
  const [prescriptions, setPrescriptions] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (auth?.token) {
      setLoading(true);
      axios
        .get('/api/prescriptions/show_all', {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          setPrescriptions(res.data.prescriptions);
          setLoading(false);
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
    }
  }, [auth?.token]);
  const handleClick = (id) => {
    history.push(`/records/prescription?id=${id}`);
  };
  const handleRating = (newRating, recordId) => {
    const data = {
      doc_rating: newRating,
    };
    axios
      .put(`/api/records/feedback/${recordId}`, data, {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {})
      .catch();
  };

  if (loading) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <ReactSpinner size='50px' />
          </div>
        </div>
      </div>
    );
  }

  if (!loading && prescriptions?.length === 0) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 l6 offset-l3 m8 offset-m2'>
            <h2>No records found!</h2>
            <span className='col s12 l8 m8 offset-l2 offset-m2'>
              <img src={noRecords} alt='no records' />
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
      <div className='row'>
        <h3 className='h4-style'>Your Records</h3>
      </div>
      <table className='striped responsive-table'>
        <thead>
          <tr>
            <th>Prescription Id</th>
            <th>Issued On</th>
            <th>Issued By</th>
            <th>Rate</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.prescription_id}>
              <td>{prescription.prescription_id}</td>
              <td>
                {prescription.issue_date.toString().replace('GMT', 'IST')}
              </td>
              <td>{prescription.doctor_name}</td>
              <td>
                <FeedbackRating
                  handleRating={handleRating}
                  rating={prescription.doc_rating}
                  recordId={prescription.record_id}
                />
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(prescription.prescription_id);
                  }}
                  className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                >
                  Details
                  <i className='material-icons right'>pageview</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientPrescription;
