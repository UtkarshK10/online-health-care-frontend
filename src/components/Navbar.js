import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/auth-context';
import '../jsforproject.js/all';

const HomePage = () => {
  const { auth } = useContext(AuthContext);

  return (
    // <div>
    <>
      {/* <div className='navbar-fixed'> */}
      <ul id='dropdown1' className='dropdown-content'>
        <li>
          <NavLink to={`/user/${auth.user_id}`} className='stcolour'>
            My Profile
          </NavLink>
        </li>
        <li>
          <a href='#!' className='stcolour'>
            Credit : <span className='ptcolour'>25</span>
          </a>
        </li>
        <li class='divider'></li>
        <li>
          <NavLink to='/logout' className='stcolour'>
            Logout
          </NavLink>
        </li>
      </ul>
      <nav>
        <div className='nav-wrapper pcolour'>
          <NavLink to='/' className='cleft brand-logo hide-on-med-and-down'>
            Logo
          </NavLink>
          <NavLink to='/' className='brand-logo hide-on-large-only'>
            Logo
          </NavLink>
          <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            {!auth?.isLoggedIn && (
              <>
                <li>
                  <NavLink to='/appointment'>Appointment</NavLink>
                </li>
                <li>
                  <NavLink to='/check'>Monitor Oxygen</NavLink>
                </li>
                <li>
                  <a
                    className='dropdown-trigger'
                    href='#!'
                    data-target='dropdown1'
                  >
                    Dropdown
                    <i className='material-icons right'>arrow_drop_down</i>
                  </a>
                </li>
              </>
            )}
            {!auth?.isLoggedIn && (
              <>
                <li>
                  <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                  <NavLink to='/signup'>Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {/* </div> */}
      <ul className='sidenav' id='mobile-demo'>
        {auth?.isLoggedIn && (
          <>
            <li>
              <NavLink to='/appointment'>Appointment</NavLink>
            </li>
            <li>
              <NavLink to='/check'>Monitor Oxygen</NavLink>
            </li>
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
            <li>
              <a className='dropdown-trigger' href='#!' data-target='dropdown1'>
                Dropdown
                <i className='material-icons right'>arrow_drop_down</i>
              </a>
            </li>
          </>
        )}
        {!auth?.isLoggedIn && (
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/signup'>Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default HomePage;
