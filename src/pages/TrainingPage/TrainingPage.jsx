import Container from 'components/common/Container';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import MyGoals from 'components/Training/MyGoals';
import BookList from 'components/Training/BookList';
import Graphic from 'components/Training/Graphic';
import BooksTable from 'components/Training/BooksTable';
import TrainingForm from 'components/Training/TrainingForm';
import MediaQuery from 'react-responsive';
import PlusButton from 'components/common/PlusButton';
import s from './TrainingPage.module.scss';


const TrainingPage = () => {
  return (
        <Container>
            <MediaQuery maxWidth={767}>
                <HiArrowNarrowLeft className={s.icon}/>
                <MyGoals/>
                <BookList/>
                <Graphic/>
                <PlusButton/>
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={1279}>
                <MyGoals/>
                <TrainingForm/>
                <BooksTable/>
                <Graphic/>
            </MediaQuery>
            <MediaQuery minWidth={1280}>
                <div className={s.desctopContainer}>
                    <div className={s.left}>
                        <TrainingForm/>
                        <BooksTable/>
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
