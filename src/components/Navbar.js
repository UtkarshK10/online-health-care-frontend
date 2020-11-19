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
            <nav>
                <div className='nav-wrapper pcolour'>
                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/' className='cleft brand-logo hide-on-med-and-down'>
                        Logo
          </NavLink>
                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/' className='brand-logo hide-on-large-only'>
                        Logo
          </NavLink>
                    <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul className='right hide-on-med-and-down pad'>
                        {auth?.isLoggedIn && (
                            <>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/appointment'>Appointment</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/oxymeter'>Monitor Oxygen</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/logout'>Logout</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to={`/user/${auth.user_id}`}>My Account</NavLink>
                                </li>
                            </>
                        )}
                        {!auth?.isLoggedIn && (
                            <>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/login'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={{ backgroundColor: '#db4619' }} exact to='/signup'>Signup</NavLink>
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
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to='/appointment'>Appointment</NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to='/check'>Monitor Oxygen</NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to='/logout'>Logout</NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to={`/user/${auth.user_id}`}>My Account</NavLink>
                        </li>
                    </>
                )}
                {!auth?.isLoggedIn && (
                    <>
                        <li>
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to='/login'>Login</NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={{ backgroundColor: '#db4619' }} to='/signup'>Signup</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
};

export default HomePage;
