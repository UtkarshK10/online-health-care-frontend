import React from 'react';
import healthcare from '../assets/healthcare.svg';
import Typist from 'react-typist';

const AboutProject = () => {
  return (
    <div className='container'>
      <div className='row'>
        <br />
        <div className='col s12'>
          <img src={healthcare} width='85' alt='logo' />
        </div>
        <div className='col s12 justify-align' style={{ fontSize: '1.4em' }}>
          <p>
            The lockdown that took place due to the Covid-19 all around the
            country had some severe impact on people. Most of them were afraid
            to go outside of their homes. People were reluctant to go even for a
            checkup. <br />
            The aim of this project is to provide a frequent online health
            checkup to those people who do not have any access to nearby health
            facility and those who do not wish to go physically to a clinic or a
            hospital for a checkup.
          </p>
          <Typist>
            <p>The parameters that we focus on are-</p>
            <ol>
              <li>Body temperature </li> <li>SpO2 level in blood</li>{' '}
              <li>Measured heart rate</li> <li>Difficulty in breathing</li>{' '}
              <li>Travel history</li> <li> Disease history</li>{' '}
              <li>Symptom Checking</li>
            </ol>
            <p>
              The patient has access to choose a doctor with whom he/she wants
              an appointment. For this the patient has to create a record which
              consists of question related to the parameters defined above. This
              record detail is then sent to the doctor who then reviews it and
              schedules an appointment with the patient and also prescribes
              him/her some medicine.
              <br />
              We have provided a functionality which allows the patient to buy
              medicines from our online store.
              <br />
              In this application we have included/adopted coins system. Every
              transaction takes place based on the coins available to the
              patient. The patient can buy new credits through payment via
              debit/credit card.
              <br />
              The main idea behind this project is to increase the connectivity
              between people and online health clinics such as ours at an
              affordable price. These type of applications can be effective
              especially during time of crisis. This will allow to narrow down
              the load on the offline health centres, clinics and hospitals as
              well.
            </p>
          </Typist>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
