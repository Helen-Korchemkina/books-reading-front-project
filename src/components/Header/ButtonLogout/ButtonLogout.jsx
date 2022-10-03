import s from './ButtonLogout.module.css';
import { useLogoutMutation } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Modal = ({ confirm, togle }) => {
  return (
    <div>
      <p>text</p>
      <button
        onClick={() => {
          confirm(true);
          togle(false);
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          confirm(false);
          togle(false);
        }}
      >
        No
      </button>
    </div>
  );
};

const ButtonLogout = () => {
  const [logout] = useLogoutMutation();
  const { credentialsUpdate } = useAuth();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const [togle, setTogle] = useState(false);

  const handleLogout = () => {
    if (confirm) {
      logout(credentialsUpdate({ user: null, token: null, isLogin: false }));
      navigate('/', { replace: true });
      setTogle(false);
    }
    setTogle(true);
  };

  return (
    <>
      <button className={s.buttonLogout} onClick={handleLogout}>
        Logout
      </button>

      {togle ? <Modal confirm={setConfirm} togle={setTogle} /> : null}
    </>
  );
};

export default ButtonLogout;
