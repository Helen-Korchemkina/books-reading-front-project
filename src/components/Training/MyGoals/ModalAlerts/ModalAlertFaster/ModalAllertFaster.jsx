import s from './ModalAllertFaster.module.scss';

import Button from 'components/common/Button';
import { useLazyLogoutQuery } from 'redux/auth/auth-api';
import { useNavigate } from 'react-router-dom';

function ModalAllertFaster({ close }) {
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className={s.modal}>
      <p className={s.text}>
        Well done! but you need to be a little bit faster. You can do it
      </p>
      <div className={s.buttonWrap}>
        <Button
          variant="filled"
          modifClass={s.button}
          onClose={() => {}}
          onClick={() => {
            handleLogout();
          }}
        >
          New training
        </Button>
        <Button modifClass={s.button} onClose={() => {}}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default ModalAllertFaster;
