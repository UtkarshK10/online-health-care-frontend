import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';

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
      {/* <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper pcolour'>
            <NavLink
              to='/doctors'
              className='cleft brand-logo hide-on-med-and-down'
            >
              Logo
            </NavLink>
            <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {auth?.isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      to='/doctors/schedules'
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      <i className="material-icons">
                        event_note
</i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/doctors/user`}
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={`/logout`}
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      Logout
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

        <ul className='sidenav' id='mobile-demo overlay-remove'>
          {auth?.isLoggedIn && (
            <>
              <li>
                <NavLink
                  to='/doctors/schedules'
                  activeStyle={{ backgroundColor: '#db4619' }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="material-icons">
                      event_note
</i>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/doctors/user`}
                  activeStyle={{ backgroundColor: '#db4619' }}
                >
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={`/logout`}
                  activeStyle={{ backgroundColor: '#db4619' }}
                >
                  Logout
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
      </div> */}
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper pcolour'>
            <NavLink to='/' className='cleft brand-logo hide-on-med-and-down'>
              Logo
            </NavLink>
            <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {auth?.isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      to='/doctors/schedules'
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      <i className="material-icons">
                        event_note
</i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/doctors/user`}
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={`/logout`}
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      Logout
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
            <li >
              <NavLink
                to='/doctors/schedules'
                activeStyle={{ backgroundColor: '#db4619', color: 'white' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i className="material-icons">
                  event_note
</i>

              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/doctors/user`}
                activeStyle={{ backgroundColor: '#db4619', color: 'white' }}
              >
                My Profile
                </NavLink>
            </li>

            <li>
              <NavLink
                to={`/logout`}
                activeStyle={{ backgroundColor: '#db4619', color: 'white' }}
              >
                Logout
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
