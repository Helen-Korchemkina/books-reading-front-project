import Button from 'components/Button';
import Container from 'components/Container';
import listArrow from '../../images/listArrow.svg';
import s from './InfoPage.module.scss';

export default function InfoPage() {
  return (
    <>
      <header className={s.header}>BR</header>
      <Container>
        <h1 className={s.title}>Books Reading</h1>

        <div className={s.listContainer}>
          <p className={s.listTitle}>Will help you to</p>
          <ul className={s.featuresList}>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>
                Create your goal faster and proceed to read
              </span>
            </li>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>
                Divide process proportionally for each day
              </span>
            </li>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>Track your success</span>
            </li>
          </ul>
          <p className={s.listTitle}>You may also</p>
          <ul className={s.featuresList}>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>
                Pose your own independent point of view
              </span>
            </li>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>
                Improve your professional skills according to new knowledge
              </span>
            </li>
            <li className={s.featuresListItem}>
              <img src={listArrow} alt="arrow" />
              <span className={s.listText}>
                Become an interesting interlocutor
              </span>
            </li>
          </ul>
        </div>
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
