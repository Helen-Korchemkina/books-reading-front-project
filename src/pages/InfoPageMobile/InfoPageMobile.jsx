import Button from 'components/Button';
import Container from 'components/Container';
import BooksReadingAdvantages from 'components/BooksReadingAdvantages/BooksReadingAdvantages';
import s from './InfoPage.module.scss';

export default function InfoPage() {
  return (
    <>
      <Container>
        <BooksReadingAdvantages />
        <div className={s.btnContainer}>
          <Button variant="outline" type="button">
            Log In
          </Button>
          <Button variant="outline" type="button" modifClass={s.leftBtn}>
            Register
          </Button>
        </div>
      </Container>
    </>
  );
}
