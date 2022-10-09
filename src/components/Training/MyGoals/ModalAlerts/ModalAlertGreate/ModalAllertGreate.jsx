import Button from 'components/common/Button';
import { MdOutlineThumbUp } from 'react-icons/md';
import s from './ModalAllertGreate.module.scss';
import { useLazyLogoutQuery } from 'redux/auth/auth-api';
import { useNavigate } from 'react-router-dom';
function ModalAllertGreate() {
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className={s.modal}>
      <MdOutlineThumbUp className={s.likeIcon} />
      <p className={s.text}>Congratulations! Another book read.</p>
      <div className={s.buttonWrap}>
        <Button
          variant="filled"
          modifClass={s.button}
          onClick={() => {
            handleLogout();
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default ModalAllertGreate;
