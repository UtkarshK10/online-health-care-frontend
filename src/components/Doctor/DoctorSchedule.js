import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/axios';
import DetailsIcon from '../../assets/details.png';
import { AuthContext } from '../../contexts/auth-context';
import PatientDetailsCard from './PatientDetailsCard';
import Prescription from '../../assets/prescription.png';
import ConfirmationModal from '../../Modal/ConfirmationModal';
import M from 'materialize-css/dist/js/materialize.min.js';
import videoCall from '../../assets/video-call.png';
import sad from '../../assets/sad.png';
import ReactSpinner from '../ReactSpinner';

const DoctorSchedule = () => {
  const { auth } = useContext(AuthContext);
  const [patientDetails, setPatientDetails] = useState([]);
  const [currPatient, setCurrPatient] = useState({});
  const [isDetails, setIsDetails] = useState(false);
  const history = useHistory();
  const [propData, setPropData] = useState(null);
  const [openModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOTP = () => {
    var elem = document.querySelector('.cmodal');
    var instance = M.Modal.init(elem, { dismissible: false });
    instance.open();
  };

  useEffect(() => {
    if (openModal) getOTP();
    // eslint-disable-next-line
  }, [openModal]);

  const handleClick = (email, id) => {
    history.push(`/doctors/mail?email=${email}&id=${id}`);
  };

  const handleAttendedConfirmation = (id) => {
    setPropData({
      label: 'Are you sure you want to mark it as attended ?',
      callback: handleAttended,
      id: id,
      closeModal: () => setModal(false),
    });
    setModal(true);
  };

  const handleAttended = (id) => {
    axios
      .patch(
        '/api/records/attended',
        { id: id },
        {
          headers: {
            'dapi-token': auth?.token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          updatePatientDetails(id);
        }
      })
      .catch((err) => {
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  };

  const updatePatientDetails = (id) => {
    setPatientDetails(
      patientDetails.map((patient) => {
        if (patient.patient_record_id === id) {
          patient.attended = 1;
          return patient;
        }
        return patient;
      })
    );
  };

  useEffect(() => {
    const fetchPatientDetails = () => {
      setLoading(true);
      axios
        .get('/api/doctors/pat_details', {
          headers: {
            'dapi-token': auth.token,
          },
        })
        .then((res) => {
          setPatientDetails([...res.data.details]);
          setLoading(false);
          console.log(res);
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
    if (auth.token) fetchPatientDetails();
  }, [auth.token]);

  if (isDetails) {
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

  const URL = 'https://medico-videocall.herokuapp.com/login';
  return (
    <div className='container' style={{ paddingTop: '30px' }}>
      <ul className='collection with-header' style={{ marginTop: '0px' }}>
        <li className='collection-header bgcolor'>
          <h4>Patient Details List</h4>
        </li>
        {patientDetails.length > 0 &&
          patientDetails.map((patientDetail, idx) => (
            <React.Fragment key={idx}>
              <li className='row'>
                <div className='col s12 m3 l3'>
                  <p
                    style={{
                      fontSize: '1.7em',
                      marginLeft: '0px',
                      marginTop: '10px',
                    }}
                  >
                    {patientDetail.patient_name} <br />
                    {patientDetail.age}
                    <br />
                    {patientDetail.gender.toString().toUpperCase()[0]}
                  </p>
                </div>
                <div className='col s6 m2 l2'>
                  <p
                    className='text-primary'
                    style={{
                      fontSize: '1.5em',
                      marginTop: '12px',
                      fontWeight: '400',
                    }}
                  >
                    {patientDetail?.meeting_time.toString().replace('GMT', '')}
                  </p>
                </div>
                <div className='col s6 l1 m1 offset-m1 offset-l1'>
                  <p
                    className='text-primary'
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
                <div className='col s12 m3 l3 offset-m2 offset-l2'>
                  <div className='row'>
                    <div className='col s9 m9 l9'>
                      <button
                        disabled={patientDetail.attended}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(
                            patientDetail?.patient_email,
                            patientDetail.patient_record_id
                          );
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
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <button
                        className='btn btn-medium pcolour btn-register waves-effect waves-light hover'
                        style={{ marginTop: '0px' }}
                        disabled={patientDetail.attended}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAttendedConfirmation(
                            patientDetail.patient_record_id
                          );
                        }}
                      >
                        Mark
                        <i className='material-icons right'>check_circle</i>
                      </button>
                    </div>
                    <div className='col'>
                      <a
                        style={{ margin: 0, padding: 0 }}
                        target='_blank'
                        rel='noreferrer'
                        href={`${URL}?id=${patientDetail.patient_record_id}&roomId=${patientDetail.room_id}`}
                      >
                        <img
                          src={videoCall}
                          alt='videocall'
                          style={{ width: '40px' }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </li>{' '}
              <div className='divider'></div>
            </React.Fragment>
          ))}
        {patientDetails.length === 0 && !loading && (
          <p style={{ fontSize: '34px' }}>
            No records found
            <br />
            <br />
            <img src={sad} alt='noRecord' style={{ height: '200px' }} />
          </p>
        )}
      </ul>
      <ConfirmationModal propData={propData} />
    </div>
  );
};

export default DoctorSchedule;
