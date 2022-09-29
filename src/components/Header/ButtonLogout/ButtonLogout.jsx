import { useEffect } from 'react';
import s from './ButtonLogout.module.css';

const ButtonLogout = () => {
  useEffect(() => {}, []);

  const handleButton = e => {
    console.log(e);
  };
  return (
    <button className={s.buttonLogout} onClick={handleButton}>
      Logout
    </button>
  );
};

export default ButtonLogout;
