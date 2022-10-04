import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getToken } from 'redux/auth/authSelectors';

function ProtectedRoute({ redirectTo = '/' }) {
  const token = useSelector(getToken);
  return !Boolean(token) ? <Outlet /> : <Navigate to={redirectTo} />;
}

ProtectedRoute.prototype = {
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
