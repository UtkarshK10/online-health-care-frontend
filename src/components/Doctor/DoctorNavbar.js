import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import healthcare from '../../assets/healthcare.svg';

import M from 'materialize-css/dist/js/materialize.min.js';
const DoctorNavbar = () => {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    M.AutoInit();
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });
  return (
    <>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper pcolour'>
            <NavLink
              to='/doctors'
              className='cleft brand-logo hide-on-med-and-down'
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={healthcare}
                  width='35'
                  alt='logo'
                  style={{ marginRight: '5px' }}
                />
                Medico
              </span>
            </NavLink>
            <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {auth?.isLoggedIn && (
                <>
                  <li>
                    <NavLink to='/doctors/schedules' activeClassName='scolour'>
                      <i className='material-icons'>event_note</i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/doctors/user`} activeClassName='scolour'>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Profile &nbsp;
                        <i className='material-icons'>account_circle</i>
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to={`/logout`} activeClassName='scolour'>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Logout&nbsp;
                        <i className='material-icons'>directions_run</i>
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {!auth?.isLoggedIn && (
                <>
                  <li>
                    <NavLink to='/doctors/login'>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to='/doctors/signup'>Signup</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <ul className='sidenav' id='mobile-demo'>
        {auth?.isLoggedIn && (
          <>
            <li>
              <NavLink
                to='/doctors/schedules'
                activeClassName='scolour'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className='material-icons'>event_note</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/doctors/user`} activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Profile &nbsp;<i className='material-icons'>account_circle</i>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to={`/logout`} activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Logout&nbsp;<i className='material-icons'>directions_run</i>
                </span>
              </NavLink>
            </li>
          </>
        )}
        {!auth?.isLoggedIn && (
          <>
            <li>
              <NavLink to='/doctors/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/doctors/signup'>Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default DoctorNavbar;
