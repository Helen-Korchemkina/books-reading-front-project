import s from './ButtonLogout.module.css';
import { useLazyLogoutQuery } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ModalWindow from 'components/common/ModalWindow';
import CloseModal from '../CloseModal';

const ButtonLogout = () => {
  const [togle, setTogle] = useState(false);

  const openModal = () => {
    setTogle(true);
  };

  return (
    <>
      <button className={s.buttonLogout} onClick={openModal}>
        Logout
      </button>

      {togle ? (
        <ModalWindow onClose={openModal}>
          <CloseModal togle={setTogle} />
        </ModalWindow>
      ) : null}
    </>
  );
};

export default ButtonLogout;
