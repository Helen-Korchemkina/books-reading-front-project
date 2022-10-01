import { useDispatch } from 'react-redux';

import { useLogoutUserQuery } from 'redux/user/authOperations';

import s from './ButtonLogout.module.css';

const ButtonLogout = () => {
  const dispatch = useDispatch();
  // const [logoutUser] = useLogoutUserQuery();
  const handleLogout = () => {};
  return (
    <button className={s.buttonLogout} onClick={() => dispatch(handleLogout)}>
      Logout
    </button>
  );
};

export default ButtonLogout;
