import Button from 'components/common/Button';

import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLazyLogoutQuery } from 'redux/auth/auth-api';
import { useAuth } from 'redux/auth/authSlice';
import { booksApi } from 'redux/books/books-api';
import s from './CloseModal.module.scss';

const CloseModal = ({ togle }) => {
  const [logout] = useLazyLogoutQuery();
  const { credentialsUpdate } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    credentialsUpdate({ user: null, token: null, isLogin: false });
    dispatch(booksApi.util.resetApiState());
    navigate('/', { replace: true });
    togle(false);
  };

  return (
    <div className={s.modal}>
      <p className={s.text}>
        The changes you made will be lost if you navigate away from this
        application
      </p>
      <div className={s.buttonWrap}>
        <Button
          modifClass={s.button}
          onClick={() => {
            togle(false);
          }}
        >
          Cancel
        </Button>
        <Button
          modifClass={s.button}
          variant="filled"
          onClick={() => {
            handleLogout();
          }}
        >
          <Media queries={{ small: { maxWidth: 480 } }}>
            {matches => matches.small && 'Leave'}
          </Media>
          <Media queries={{ small: { minWidth: 481 } }}>
            {matches => matches.small && 'Leave this app'}
          </Media>
        </Button>
      </div>
    </div>
  );
};

export default CloseModal;
