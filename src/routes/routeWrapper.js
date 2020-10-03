import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const user = useSelector((state) => state.login);

  let signed = false;

  if (user) {
    signed = true;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: propTypes.bool,
  component: propTypes.oneOfType([propTypes.elementType, propTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
