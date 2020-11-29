import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import axios from '../axios/axios';
import { useHistory } from 'react-router-dom';
const PatientPrescription = () => {
  const history = useHistory();
  const [prescriptions, setPrescriptions] = useState([]);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios.get('/api/prescriptions/show_all', {
      headers: {
        'api-token': auth?.token
      }
    })
      .then(res => {
        setPrescriptions(res.data.prescriptions);
      })
      .catch(e => {
        console.log(e);
      })
  }, [auth?.token]);
  const handleClick = id => {
    history.push(`/records/prescription?id=${id}`)

  }
  return (
    <div className='container'>
      <div className='row'>
        <h3>Your Records</h3>
      </div>
      <table className='striped responsive-table'>
        <thead>
          <tr>
            <th>Prescription Id</th>
            <th>Issued On</th>
            <th>Issues By</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.prescription_id}>
              <td>{prescription.prescription_id}</td>
              <td>
                {prescription.issue_date
                  .toString()
                  .replace('GMT', 'IST')}
              </td>
              <td>{prescription.doctor_name}</td>
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
