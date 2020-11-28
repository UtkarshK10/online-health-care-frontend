import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import axios from '../axios/axios';

const PatientPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    // axios.get()
  }, [auth?.token]);
  return (
    <div className='container'>
      <div className='row'>
        <h3>Your Orders</h3>
      </div>
      <table className='striped responsive-table'>
        <thead>
          <tr>
            <th>Prescription Id</th>
            <th>Issued On</th>
            <th>Total Items</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.id}</td>
              <td>
                {prescription.prescription_date
                  .toString()
                  .replace('GMT', 'IST')}
              </td>
              <td>{prescription.items_count}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // handleClick(prescription.id);
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
