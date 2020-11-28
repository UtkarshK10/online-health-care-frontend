import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/axios';
import DetailsIcon from '../../assets/details.png';
import { AuthContext } from '../../contexts/auth-context';
import PatientDetailsCard from './PatientDetailsCard';
import Prescription from '../../assets/prescription.png';

const DoctorSchedule = () => {
  const { auth } = useContext(AuthContext);
  const [patientDetails, setPatientDetails] = useState([]);
  const [currPatient, setCurrPatient] = useState({});
  const [isDetails, setIsDetails] = useState(false);
  const history = useHistory();

  const handleClick = (email) => {
    history.push(`/doctors/mail?email=${email}`);
  };

  useEffect(() => {
    const fetchPatientDetails = () => {
      axios
        .get('/api/doctors/pat_details', {
          headers: {
            'dapi-token': auth.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setPatientDetails([...res.data.details]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (auth.token) fetchPatientDetails();
  }, [auth.token]);

  if (isDetails) {
    console.log(currPatient);
    return (
      <PatientDetailsCard
        updateState={setIsDetails}
        currPatient={currPatient}
      />
    );
  }
  const handlePrescription = (id) => {
    history.push(`/doctors/prescription?id=${id}`);
  };
  return (
    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>Patient Details List</h4>
        </li>
        {patientDetails.map((patientDetail, idx) => (
          <li className='row' key={idx}>
            <div className='col s12 m3 l3'>
              <p style={{ fontSize: '1.5em', marginLeft: '0px' }}>
                {patientDetail.patient_name} <br />
                {patientDetail.age}
              </p>
            </div>
            <div className='col s6 m1 l1'>
              <p
                className='ptcolour'
                style={{ fontSize: '4.2em', margin: '2px', fontWeight: '400' }}
              >
                {patientDetail.gender[0].toUpperCase()}
              </p>
            </div>
            <div className='col s6 l1 m1 offset-m1 offset-l1'>
              <p
                className='ptcolour'
                style={{ fontSize: '4.3em', margin: '2px' }}
              >
                <img
                  src={DetailsIcon}
                  alt='details Icon'
                  className='icon-size'
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrPatient({ ...patientDetails[idx] });
                    setIsDetails(true);
                  }}
                />
              </p>
            </div>
            <div className='col s12 m3 l3 offset-m3 offset-l3'>
              <div className='row'>
                <div className='col s9 m9 l9'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(patientDetail?.patient_email);
                    }}
                    className='btn btn-medium pcolour btn-register waves-effect waves-light hover'
                  >
                    Send Mail
                    <i className='material-icons right'>call_made</i>
                  </button>
                </div>
                <div className='col' style={{ paddingLeft: 0 }}>
                  <img
                    src={Prescription}
                    alt='Prescription'
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrescription(patientDetail.patient_record_id);
                    }}
                    style={{
                      width: '40px',
                      marginTop: '11px',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>{' '}
              <button
                className='btn btn-medium pcolour btn-register waves-effect waves-light hover'
                style={{ marginTop: '0px' }}
              >
                Mark as complete
                <i className='material-icons right'>check_circle</i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {}
    </div>
  );
};

export default DoctorSchedule;
