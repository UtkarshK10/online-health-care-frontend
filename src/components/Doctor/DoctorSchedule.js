import React, { useState, useEffect, useContext } from 'react'
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context'

const DoctorSchedule = () => {
    const { auth } = useContext(AuthContext)
    const [patientDetails, setPatientDetails] = useState([]);
    const [currPatient, setCurrPatient] = useState({});
    const [isDetails, setIsDetails] = useState(false);
    useEffect(() => {
        const fetchPatientDetails = () => {
            axios.get('/api/doctors/pat_details', {
                headers: {
                    'dapi-token': auth.token
                }
            }).then(res => {
                setPatientDetails([...res.data.details])

            })
                .catch(err => {
                    console.log(err)
                })
        }
        if (auth.token)
            fetchPatientDetails();
    }, [auth.token]);


    if (isDetails) {
        console.log(currPatient);
        return (
            <div className="row">
                <div className="col s12 m6 l4 offset-m3 offset-l4">
                    <div className="card">
                        <div class="card-content">
                            <span class="card-title">{currPatient.patient_name}</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <ul class="collection with-header">
                <li class="collection-header"><h4>Patient Details List</h4></li>
                {patientDetails.map((patientDetail, idx) => (
                    <li className="collection-item" key={idx}>
                        <span className="title">{patientDetail.patient_name}</span>
                        <p>{patientDetail.gender} <br />
                            {patientDetail.age}
                        </p>
                        <a onClick={e => {
                            e.preventDefault();
                            setCurrPatient({ ...patientDetails[idx] })
                            setIsDetails(true)
                        }} href="#!" class="secondary-content"><i class="material-icons">details</i></a>
                    </li>
                ))}
            </ul>
            {}
        </div >
    )
}

export default DoctorSchedule