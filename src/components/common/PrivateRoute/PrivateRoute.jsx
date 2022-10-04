import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getIsLogin } from 'redux/auth/authSelectors';

function PrivateRoute({ redirectTo = '/' }) {
  const isLogin = useSelector(getIsLogin);
  return isLogin ? <Outlet /> : <Navigate to={redirectTo} />;
}

PrivateRoute.prototype = {
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
