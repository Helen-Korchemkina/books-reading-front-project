import { useState, useEffect, useMemo } from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
import { toast } from 'react-toastify';

import { useGetUserTrainingQuery } from 'redux/auth/auth-api';
import { useUpdateUserTrainingMutation } from 'redux/auth/auth-api';

import Container from 'components/common/Container';
import MyGoals from 'components/Training/MyGoals';
import BookList from 'components/Training/BookList';
import MobileForm from 'components/Training/MobileForm';
import Button from 'components/common/Button';
import Graphic from 'components/Training/Graphic';
import Timer from 'components/Training/Timer';
import TrainingForm from 'components/Training/TrainingForm';
import PlusButton from 'components/common/PlusButton';
import Results from 'components/Training/Results';

import s from './TrainingPage.module.scss';

const TrainingPage = () => {
  const { data = {}, isSuccess } = useGetUserTrainingQuery();
  const [date_start, setDate_start] = useState(null);
  const [date_finish, setDate_finish] = useState(null);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(true);
  const [isBooksInTable, setIsBooksInTable] = useState(false);
  const [addTimerValue] = useUpdateUserTrainingMutation();

  const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const showAddForm = isMobileScreen ? showMobileForm : true;

  const userHasRunnigTraining = useMemo(
    () =>
      isSuccess &&
      data?.training?.finishMillisecond &&
      data.training.finishMillisecond > Date.now(),
    [isSuccess, data]
  );

  useEffect(() => {
    if (userHasRunnigTraining) {
      setDate_start(data.training.startMillisecond);
      setDate_finish(data.training.finishMillisecond);
      setTimerIsActive(true);
    }
  }, [data, userHasRunnigTraining]);

  useEffect(() => {
    setShowMobileForm(true);
  }, [isMobileScreen]);

  async function handleSubmitTrainingStart(e) {
    setTimerIsActive(true);
    try {
      await addTimerValue({
        date_start: date_start,
        date_finish: date_finish,
      }).unwrap();

      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  const handleIsBooksInTable = booksLength => {
    if (booksLength !== 0) {
      setIsBooksInTable(true);
    } else {
      setIsBooksInTable(false);
    }
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
            date_start={date_start}
            date_finish={date_finish}
            setDate_start={setDate_start}
            setDate_finish={setDate_finish}
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
            {timerIsActive && (
              <Timer date_finish={date_finish} timerIsActive={timerIsActive} />
            )}
            <MyGoals isShow={timerIsActive} time={date_finish} />
            <BookList />
            {date_start && date_finish && !timerIsActive && isBooksInTable && (
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
          isInTable={handleIsBooksInTable}
          isShow={timerIsActive}
          date_start={date_start}
          date_finish={date_finish}
          setDate_start={setDate_start}
          setDate_finish={setDate_finish}
        />
        {date_start && date_finish && !timerIsActive && isBooksInTable && (
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
              isInTable={handleIsBooksInTable}
              isShow={timerIsActive}
              date_start={date_start}
              date_finish={date_finish}
              setDate_start={setDate_start}
              setDate_finish={setDate_finish}
            />
            {date_start && date_finish && !timerIsActive && isBooksInTable && (
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
