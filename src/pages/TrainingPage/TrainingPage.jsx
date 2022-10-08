import { useState, useEffect } from 'react';
import Container from 'components/common/Container';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';
import MyGoals from 'components/Training/MyGoals';
import BookList from 'components/Training/BookList';
import MobileForm from 'components/Training/MobileForm';
import Button from 'components/common/Button';
import Graphic from 'components/Training/Graphic';
import Timer from 'components/Training/Timer';
import TrainingForm from 'components/Training/TrainingForm';
import MediaQuery from 'react-responsive';
import PlusButton from 'components/common/PlusButton';
import s from './TrainingPage.module.scss';
import Results from 'components/Training/Results';

const TrainingPage = () => {
  const [date_start, setDate_start] = useState(null);
  const [date_finish, setDate_finish] = useState(null);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(true);
  const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const showAddForm = isMobileScreen ? showMobileForm : true;
  useEffect(() => {
    setShowMobileForm(true);
  }, [isMobileScreen]);

  const handleSubmitTrainingStart = e => {
    setTimerIsActive(true);
  };

  return (
    <Container>
      <MediaQuery maxWidth={767}>
        {isMobileScreen && (
          <HiArrowNarrowLeft
            className={s.icon}
            onClick={() => setShowMobileForm(!showAddForm)}
          />
        )}
        {showAddForm && (
          <MobileForm
            onFormSubmit={
              isMobileScreen
                ? () => {
                    setShowMobileForm(false);
                    setTimeout(() => {
                      window.scrollTo({
                        top: document.body.scrollHeight + 120,
                        behavior: 'smooth',
                      });
                    });
                  }
                : null
            }
          />
        )}
        {!showAddForm && (
          <>
            <Timer />
            <MyGoals isShow={timerIsActive} time={date_finish} />
            <BookList />
            {date_start && date_finish && !timerIsActive && (
              <Button
                variant="filled"
                modifClass={s.button}
                onClick={handleSubmitTrainingStart}
              >
                Start traning
              </Button>
            )}
            <Graphic />
            {timerIsActive && <Results />}
            {isMobileScreen && (
              <PlusButton onClick={() => setShowMobileForm(true)} />
            )}
          </>
        )}
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={1279}>
        {timerIsActive && (
          <Timer date_finish={date_finish} timerIsActive={timerIsActive} />
        )}
        <MyGoals isShow={timerIsActive} time={date_finish} />
        <TrainingForm
          date_start={date_start}
          date_finish={date_finish}
          setDate_start={setDate_start}
          setDate_finish={setDate_finish}
        />
        {date_start && date_finish && !timerIsActive && (
          <Button
            variant="filled"
            modifClass={s.button}
            onClick={handleSubmitTrainingStart}
          >
            Start traning
          </Button>
        )}
        <Graphic />
        {timerIsActive && <Results />}
      </MediaQuery>
      <MediaQuery minWidth={1280}>
        <div className={s.desctopContainer}>
          <div className={s.left}>
            {timerIsActive && (
              <Timer date_finish={date_finish} timerIsActive={timerIsActive} />
            )}
            <TrainingForm
              date_start={date_start}
              date_finish={date_finish}
              setDate_start={setDate_start}
              setDate_finish={setDate_finish}
            />
            {date_start && date_finish && !timerIsActive && (
              <Button
                variant="filled"
                modifClass={s.button}
                onClick={handleSubmitTrainingStart}
              >
                Start traning
              </Button>
            )}
            <Graphic />
          </div>
          <div className={s.right}>
            <MyGoals isShow={timerIsActive} time={date_finish} />
            {timerIsActive && <Results />}
          </div>
        </div>
      </MediaQuery>
    </Container>
  );
};

export default TrainingPage;
