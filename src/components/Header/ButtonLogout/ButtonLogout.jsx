import s from './ButtonLogout.module.css';
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
