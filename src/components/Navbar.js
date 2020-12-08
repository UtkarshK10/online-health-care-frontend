import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth-context';
import healthcare from '../assets/healthcare.svg';
import M from 'materialize-css/dist/js/materialize.min.js';

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    M.AutoInit();
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });
  const { pathname } = useLocation();
  return (
    <>
      {auth?.isLoggedIn && (
        <>
          <ul id='dropdown1' className='dropdown-content bgsecondary'>
            <li>
              <NavLink to={`/user`} className='text-secondary'>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/records`} className='text-secondary'>
                Records
              </NavLink>
            </li>
            <li>
              <NavLink to='/shopping/orders' className='text-secondary'>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/payment' className='highlight'>
                Credits : <span className='ptcolour'>{auth.credits}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/transactions' className='text-secondary'>
                Transactions
              </NavLink>
            </li>
            <li className='divider'></li>
            <li>
              <NavLink to='/logout' className='text-secondary'>
                Logout
              </NavLink>
            </li>
          </ul>
          <ul id='dropdown2' className='dropdown-content bgsecondary'>
            <li>
              <NavLink to='/help' className='text-secondary'>
                Help
              </NavLink>
            </li>
            <li>
              <NavLink to='/aboutus' className='text-secondary'>
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to='/aboutproject' className='text-secondary'>
                About Project
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper pcolour'>
            <NavLink to='/' className='cleft brand-logo hide-on-med-and-down'>
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
              to='/'
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
                  {pathname.includes('appointment') && (
                    <li>
                      <NavLink to='/appointment' activeClassName='scolour'>
                        Appointment
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to='/shopping/home' activeClassName='scolour'>
                      <i className='material-icons'>store</i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/shopping/cart' activeClassName='scolour'>
                      <i className='material-icons'>shopping_cart</i>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/oxymeter' activeClassName='scolour'>
                      Monitor Oxygen
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className='dropdown-trigger'
                      href='#!'
                      data-target='dropdown1'
                    >
                      My Account
                      <i className='material-icons right'>arrow_drop_down</i>
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-trigger'
                      href='#!'
                      data-target='dropdown2'
                    >
                      Need help?
                      <i className='material-icons right'>arrow_drop_down</i>
                    </a>
                  </li>
                </>
              )}
              {!auth?.isLoggedIn && (
                <>
                  <li>
                    <NavLink to='/doctors'>Are you a doctor?</NavLink>
                  </li>
                  <li>
                    <NavLink to='/login'>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup'>Signup</NavLink>
                  </li>
                  <li>
                    <NavLink to='/aboutproject'>About project</NavLink>
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
            {pathname.includes('appointment') && (
              <li>
                <NavLink
                  className='text-secondary'
                  to='/appointment'
                  activeClassName='scolour'
                >
                  Appointment
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to='/shopping/home' activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Store <i className='material-icons'>store</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/shopping/cart' activeClassName='scolour'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Cart <i className='material-icons'>shopping_cart</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/shopping/orders' activeClassName='scolour'>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/oxymeter' activeClassName='scolour'>
                Monitor Oxygen
              </NavLink>
            </li>
            <li>
              <NavLink to={`/user`} activeClassName='scolour'>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/records`} activeClassName='scolour'>
                Records
              </NavLink>
            </li>
            <li>
              <NavLink to='/payment' activeClassName='scolour'>
                Credits : <span className='highlight'>{auth.credits}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/transactions' activeClassName='scolour'>
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink to='/help' activeClassName='scolour'>
                Helpdesk
              </NavLink>
            </li>
            <li>
              <NavLink to='/aboutus' activeClassName='scolour'>
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to='/aboutproject' activeClassName='scolour'>
                About project
              </NavLink>
            </li>
            <li className='divider'></li>
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
          </>
        )}
        {!auth?.isLoggedIn && (
          <>
            <li>
              <NavLink
                to='/doctors'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Are you a doctor?
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/signup'
                className='sidenav-close'
                activeClassName='scolour'
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/aboutproject'
                className='sidenav-close'
                activeClassName='scolour'
              >
                About Project
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default HomePage;
