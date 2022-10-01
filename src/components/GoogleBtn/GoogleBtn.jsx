import Button from 'components/Button';
import { FcGoogle } from 'react-icons/fc';
import s from './GoogleBtn.module.scss';

export default function GoogleBtn() {
  return (
    <Button modifClass={s.googleBtn}>
      <a
        href="https://books-reading-project.herokuapp.com/api/auth/google
"
        className={s.link}
      >
        <span className={s.googleBtnLogo}>
          <FcGoogle size="20px" />
        </span>
        <span className={s.googleBtnText}>Google</span>
      </a>
    </Button>
  );
}
