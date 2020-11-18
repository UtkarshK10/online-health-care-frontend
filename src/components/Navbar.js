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
                    <NavLink exact to='/' className='cleft brand-logo hide-on-med-and-down'>
                        Logo
          </NavLink>
                    <NavLink exact to='/' className='brand-logo hide-on-large-only'>
                        Logo
          </NavLink>
                    <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul className='right hide-on-med-and-down pad'>
                        {auth?.isLoggedIn && (
                            <>
                                <li>
                                    <NavLink exact to='/appointment'>Appointment</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/oxymeter'>Monitor Oxygen</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/logout'>Logout</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={`/user/${auth.user_id}`}>My Account</NavLink>
                                </li>
                            </>
                        )}
                        {!auth?.isLoggedIn && (
                            <>
                                <li>
                                    <NavLink exact to='/login'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/signup'>Signup</NavLink>
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
                            <NavLink to={`/user/${auth.user_id}`}>My Account</NavLink>
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
