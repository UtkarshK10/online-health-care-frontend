import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = (props) => {

    const { name, photo, appointment, experience, speciality, showLink, id } = props;

    const handleChange = e => {
        e.preventDefault();
        appointment(id);
    }

    // let classD = '';
    // if (credit === amount) {
    //     classD = 'activeD';
    // }
    return (

        <div className="card">
            <div className="card-image">
                <img height="300" src={photo} alt="#" />
                {showLink &&
                    <Link onClick={handleChange} to="#" className="halfway-fab btn-floating pink pulse"><i className="material-icons">
                        add
            </i></Link>
                }
            </div>
            <div className="card-content">
                <span className="card-title">{name}</span>
                <p>Experience: {experience}</p>
                <p>Speciality: {speciality}</p>
            </div>
        </div>

    );
};

export default DoctorCard;
