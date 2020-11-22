import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import ReactSpinner from './ReactSpinner';
import DoctorCard from './DoctorCard';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import Pagination from './Pagination';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(3);
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const fetchDoctors = useCallback(() =>
    axios
      .get('/api/doctors/', {
        headers: {
          // 'api-token': auth.token
        },
      })
      .then((res) => {
        setDoctors([...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response) {
        } else if (err?.request) {
        } else {
          console.log(err);
        }
      })
  );

  useEffect(() => {
    // if (auth?.token)
    fetchDoctors();
  }, [auth?.token]);

  const makeAppointment = (id) => {
    if (auth.credits < 10) {
      M.toast({
        html: "You don't have enough credits, please add and then continue",
      });
      return;
    }
    history.push(`/appointment/oxymeter?id=${id}`);
  };

  const idxOfLastDoctor = currentPage * doctorsPerPage;
  const idxOfFirstDoctor = idxOfLastDoctor - doctorsPerPage;
  const currPageDoctors = doctors.slice(idxOfFirstDoctor, idxOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    setLoading(false);
    return <ReactSpinner size='50' />;
  }
  return (
    <>
      <div className='container top-margin  '>
        <div className='row'>
          {currPageDoctors.map((doctor) => {
            const { id, name, profile_url, experience, speciality } = doctor;
            return (
              <div key={doctor.id} className='col s12 m6 l4'>
                <DoctorCard
                  key={doctor.id}
                  id={id}
                  name={name}
                  photo={profile_url}
                  experience={experience}
                  speciality={speciality}
                  appointment={makeAppointment}
                  showLink={auth?.isLoggedIn}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        doctorsPerPage={doctorsPerPage}
        totalDoctors={doctors.length}
        paginate={paginate}
      />
    </>
  );
};

export default HomePage;
