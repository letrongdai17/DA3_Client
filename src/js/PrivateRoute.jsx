import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './helpers/storage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const companyIdentify = window.localStorage.getItem('companyIdentify');
  return (
    <Route
      {...rest}
      render={
      props => (getToken()
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: `/${companyIdentify}/login`,
              state: { from: props.location },
            }}
          />
        ))
    }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
