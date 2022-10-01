import Button from 'components/common/Button';
import { FcGoogle } from 'react-icons/fc';
import s from './GoogleBtn.module.scss';

export default function GoogleBtn() {
  return (
    <a
      href="https://books-reading-project.herokuapp.com/api/auth/google
"
      className={s.link}
    >
      <Button modifClass={s.googleBtn}>
        <span className={s.googleBtnLogo}>
          <FcGoogle size="20px" />
        </span>
        <span className={s.googleBtnText}>Google</span>
      </Button>
    </a>
  );
}
