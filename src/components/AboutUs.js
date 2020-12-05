import React, { useEffect } from 'react';
import AboutUsCard from './AboutUsCard';
import pk from '../assets/developers/pk.jpg';
import cp from '../assets/developers/cp.jpg';
import ms from '../assets/developers/ms.jpg';
import nb from '../assets/developers/nb.jpeg';
import ss from '../assets/developers/ss.jpg';
import uk from '../assets/developers/uk.jpg';

const Developers = [
  {
    image: cp,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'CHAITANYA PANDIT',
    link: 'https://www.linkedin.com/in/chaitanyapandit1998/',
  },
  {
    image: ms,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'Mandeep Singh',
    link: 'https://www.linkedin.com/in/mandysgh/',
  },
  {
    image: nb,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'nishit bisht',
    link: 'https://www.linkedin.com/in/nishit-bisht-a0aba0152/',
  },
  {
    image: pk,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'Prakhar Kamal',
    link: 'https://www.linkedin.com/in/kprakhar04/',
  },
  {
    image: ss,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'Snehansh Siddharth',
    link: 'https://www.linkedin.com/in/ssiddharth007/',
  },
  {
    image: uk,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum malesuada eros sit amet lobortis',
    name: 'Utkarsh Khanna',
    link: 'https://www.linkedin.com/in/utkarsh-khanna-43824117b/',
  },
];

const AboutUs = () => {
  useEffect(() => {
    function shuffleArray(Developers) {
      for (var i = Developers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = Developers[i];
        Developers[i] = Developers[j];
        Developers[j] = temp;
      }
    }
    shuffleArray(Developers);
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m12 l12'>
            <h3>Medico Team</h3>
          </div>
        </div>
        <div className='row'>
          {Developers.map((Developer, idx) => {
            return (
              <div className='col s12 m6 l4' key={idx}>
                <AboutUsCard
                  image={Developer['image']}
                  description={Developer['description']}
                  name={Developer['name']}
                  link={Developer['link']}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
