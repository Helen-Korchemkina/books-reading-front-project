import Container from '../common/Container/Container';
import MyGoals from './MyGoals/MyGoals';
import BookList from './BookList/BookList';
import Graphic from './Graphic/Graphic';
import BooksTable from './BooksTable/BooksTable';
import TrainingForm from './TrainingForm/TrainingForm';
import MediaQuery from 'react-responsive';
import PlusButton from 'components/common/PlusButton';
import s from './Training.module.css';


const Training = () =>{
    return(
        <>
        <Container>
            <MediaQuery minWidth={320} maxWidth={767}>
                <MyGoals/>
                <BookList/>
                <Graphic/>
                <PlusButton/>
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={1023}>
                <MyGoals/>
                <TrainingForm/>
                <BooksTable/>
                <Graphic/>
            </MediaQuery>
            <MediaQuery minWidth={1024}>
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
        </>
    )
}

export default Training;
