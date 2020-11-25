import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth-context';
import cart_icon from '../assets/cart_icon.png';

import M from 'materialize-css/dist/js/materialize.min.js';
const HomePage = () => {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    M.AutoInit();
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });
  const { pathname } = useLocation();
  return (
    <>
      {auth?.isLoggedIn && (
        <ul id='dropdown1' className='dropdown-content'>
          <li>
            <NavLink to={`/user/${auth.user_id}`} className='stcolour'>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to='/payment' className='stcolour'>
              Credits : <span className='ptcolour'>{auth.credits}</span>
            </NavLink>
          </li>
          <li className='divider'></li>
          <li>
            <NavLink to='/logout' className='stcolour'>
              Logout
            </NavLink>
          </li>
        </ul>
      )}

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
                {pathname.includes('appointment') && (
                  <li>
                    <NavLink
                      to='/appointment'
                      activeStyle={{ backgroundColor: '#db4619' }}
                    >
                      Appointment
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to='/shopping/home'
                    activeStyle={{ backgroundColor: '#db4619' }}
                  >
                    <i className='material-icons'>store</i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/shopping/cart'
                    activeStyle={{ backgroundColor: '#db4619' }}
                  >
                    {/* <img style={{
                  height: "3rem",
                  width: "3rem"
                }} src={cart_icon} alt="Cart" /> */}
                    <i className='material-icons'>shopping_cart</i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/shopping/orders'
                    activeStyle={{ backgroundColor: '#db4619' }}
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/oxymeter'
                    activeStyle={{ backgroundColor: '#db4619' }}
                  >
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
            {pathname.includes('appointment') && (
              <li>
                <NavLink
                  to='/appointment'
                  activeStyle={{ backgroundColor: '#db4619' }}
                >
                  Appointment
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to='/shopping/home'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                <span>
                  Store <i className='material-icons'>store</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/shopping/cart'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                <span>
                  Cart <i className='material-icons'>shopping_cart</i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/shopping/orders'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/oxymeter'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                Monitor Oxygen
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/user/${auth.user_id}`}
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/payment'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                Credit : <span className='ptcolour'>{auth.credits}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/payment'
                activeStyle={{ backgroundColor: '#db4619' }}
              >
                Credits : <span className='ptcolour'>{auth.credits}</span>
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
