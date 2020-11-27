import React from 'react';
import { checkForToken } from '../utils/helper';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => {


    const isAuthenticated = checkForToken();
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    Render ? (
                        Render(props)
                    ) : Component ? (
                        <Component {...props} />
                    ) : null
                ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
            }
        />
    );
}

export default PrivateRoute;