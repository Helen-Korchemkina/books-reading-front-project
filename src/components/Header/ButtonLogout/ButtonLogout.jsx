import s from './ButtonLogout.module.css';

const ButtonLogout = () => {
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
