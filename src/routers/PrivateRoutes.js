import React, { useEffect, useContext, useState } from 'react';
// import React from 'react';
import { checkForToken } from '../utils/helper';
import { Route, Redirect } from 'react-router-dom';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import NotFound from '../components/404';

export const PrivateRoute = ({
  component: Component = null,
  render: Render = null,
  ...rest
}) => {
  const { auth } = useContext(AuthContext);
  const [valid, setValid] = useState('');

  useEffect(() => {
    setValid('');
    if (auth?.token) {
      axios
        .get(`/api/doctors/find/${auth?.token}`)
        .then((res) => {
          console.log(res.data.msg + ' ' + rest.location.pathname);
          if (res.data.msg === 'doctor') {
            setValid('doctor');
          }
          if (res.data.msg === 'patient') {
            setValid('patient');
          }
        })
        .catch((err) => {
          setValid('');
          console.log('error occured');
        });
    }
  }, [auth?.token, rest.location.pathname]);

  const isAuthenticated = checkForToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && rest.location.pathname.includes('/doctors') ? (
          valid.includes('doctor') && Render ? (
            valid.includes('doctor') && Render(props)
          ) : Component ? (
            valid.includes('doctor') ? (
              <Component {...props} />
            ) : (
              <NotFound />
            )
          ) : valid.includes('patient') ? (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          ) : null
        ) : isAuthenticated && !rest.location.pathname.includes('/doctors') ? (
          valid.includes('patient') && Render ? (
            valid.includes('patient') && Render(props)
          ) : Component ? (
            valid.includes('patient') ? (
              <Component {...props} />
            ) : (
              <NotFound />
            )
          ) : valid.includes('doctor') ? (
            <Redirect
              to={{ pathname: '/doctors', state: { from: props.location } }}
            />
          ) : null
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
