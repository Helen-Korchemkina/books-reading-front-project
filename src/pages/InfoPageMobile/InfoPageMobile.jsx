import Button from 'components/common/Button';
import Container from 'components/common/Container';
import { Link } from 'react-router-dom';
import BooksReadingAdvantages from 'components/BooksReadingAdvantages/BooksReadingAdvantages';
import s from './InfoPage.module.scss';

export default function InfoPage() {
  return (
    <>
      <Container>
        <BooksReadingAdvantages />
        <div className={s.btnContainer}>
          <Link to="/login">
            <Button variant="outline" type="button">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" type="button" modifClass={s.leftBtn}>
              Register
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
