import { useState, useEffect } from 'react';
import Container from 'components/common/Container';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';
import MyGoals from 'components/Training/MyGoals';
import BookList from 'components/Training/BookList';
import MobileForm from 'components/Training/MobileForm';
import Button from 'components/common/Button';
import Graphic from 'components/Training/Graphic';
import BooksTable from 'components/Training/BooksTable';
import TrainingForm from 'components/Training/TrainingForm';
import MediaQuery from 'react-responsive';
import PlusButton from 'components/common/PlusButton';
import s from './TrainingPage.module.scss';


const TrainingPage = () => {
    const [showMobileForm, setShowMobileForm] = useState(true);
    const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const showAddForm = isMobileScreen ? showMobileForm : true;

    useEffect(() => {
        setShowMobileForm(true);
      }, [isMobileScreen]);
  return (
        <Container>
            <MediaQuery maxWidth={767}>
            {isMobileScreen && (
                <HiArrowNarrowLeft className={s.icon} onClick={() => setShowMobileForm(!showAddForm)} />
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
                {!showAddForm &&
                <>
                 <MyGoals/>
                <BookList/>
                <Button variant="filled" modifClass={s.button}>
                    Start traning
                </Button>
                <Graphic/>
                {isMobileScreen && (
              <PlusButton onClick={() => setShowMobileForm(true)} />
            )}
                </>}
                
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={1279}>
                <MyGoals/>
                <TrainingForm/>
                <BooksTable/>
                <Button variant="filled" modifClass={s.button}>
                    Start traning
                </Button>
                <Graphic/>
            </MediaQuery>
            <MediaQuery minWidth={1280}>
                <div className={s.desctopContainer}>
                    <div className={s.left}>
                        <TrainingForm/>
                        <BooksTable/>
                        <Button variant="filled" modifClass={s.button}>
                            Start traning
                        </Button>
                        <Graphic/>
                    </div>
                    <div className={s.right}>
                        <MyGoals/>
                    </div>
                </div>
            </MediaQuery>
        </Container>
  )
}

export default TrainingPage;
