import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import '../jsforproject.js/all';

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper purple'>
            <a href='#!' className='cleft brand-logo hide-on-med-and-down'>
              Logo
            </a>
            <a href='#!' className='brand-logo hide-on-large-only'>
              Logo
            </a>
            <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              <li>
                <a href='sass.html'>Sass</a>
              </li>
              <li>
                <a href='badges.html'>Components</a>
              </li>
              <li>
                <a href='collapsible.html'>Javascript</a>
              </li>
              <li>
                <a href='mobile.html'>Mobile</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul className='sidenav' id='mobile-demo'>
        <li>
          <a href='sass.html'>Sass</a>
        </li>
        <li>
          <a href='badges.html'>Components</a>
        </li>
        <li>
          <a href='collapsible.html'>Javascript</a>
        </li>
        <li>
          <a href='mobile.html'>Mobile</a>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
