import s from './ButtonLogout.module.css';
import { useLazyLogoutQuery } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ModalWindow from 'components/common/ModalWindow';

const Modal = ({ confirm, reject }) => {
  return (
    <div>
      <p>text</p>
      <button
        onClick={() => {
          confirm();
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          reject();
        }}
      >
        No
      </button>
    </div>
  );
};

const ButtonLogout = () => {
  const [logout] = useLazyLogoutQuery();
  const { credentialsUpdate } = useAuth();
  const navigate = useNavigate();

  const [togle, setTogle] = useState(false);

  const handleLogout = async () => {
    await logout();
    credentialsUpdate({ user: null, token: null, isLogin: false });
    navigate('/', { replace: true });
    setTogle(false);
  };

  return (
    <>
      <button className={s.buttonLogout} onClick={() => setTogle(true)}>
        Logout
      </button>

      {togle ? (
        <ModalWindow onClose={() => setTogle(false)}>
          <Modal confirm={handleLogout} reject={() => setTogle(false)} />
        </ModalWindow>
      ) : null}
    </>
  );
};

export default ButtonLogout;
