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

            <NavLink
              to='/doctors'
              className='brand-logo show-on-medium-and-down hide-on-large-only'
            >
              <img src={healthcare} width='35' alt='logo' />
            </NavLink>
            <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {auth?.isLoggedIn && (
                <>
                  <ul id='dropdown3' className='dropdown-content bgsecondary'>
                    <li>
                      <NavLink to='/doctors/help' className='text-secondary'>
                        Help
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/doctors/aboutus' className='text-secondary'>
                        About us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/doctors/aboutproject'
                        className='text-secondary'
                      >
                        About Project
                      </NavLink>
                    </li>
                  </ul>
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
                    <a
                      className='dropdown-trigger'
                      href='#!'
                      data-target='dropdown3'
                    >
                      Need help?
                      <i className='material-icons right'>arrow_drop_down</i>
                    </a>
                  </li>
                  <li>
                    <NavLink to={`/doctors/logout`} activeClassName='scolour'>
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
                  <li>
                    <NavLink to='/doctors/aboutproject'>About Project</NavLink>
                  </li>
                  <li>
                    <NavLink to='/doctors/aboutus'>Contact Us</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <ul className='sidenav bgcolor sideinside' id='mobile-demo'>
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
              <NavLink to={`/doctors/help`} activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Help &nbsp;<i className='material-icons'>help_outline</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/doctors/aboutus`} activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  About us &nbsp;<i className='material-icons'>info</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/doctors/aboutproject'
                className='text-secondary'
                activeClassName='scolour'
              >
                About Project
              </NavLink>
            </li>
            <li>
              <NavLink to={`/doctors/logout`}>
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
              <NavLink
                to='/doctors/login'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/doctors/signup'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/doctors/aboutproject'
                className='sidenav-close'
                activeClassName='scolour'
              >
                About Project
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/doctors/aboutus'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Contact Us
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default DoctorNavbar;
