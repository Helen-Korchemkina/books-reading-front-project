import Container from '../Container/Container';
import MyGoals from './MyGoals/MyGoals';
import BookList from './BookList/BookList';
import Graphic from './Graphic/Graphic';
import BooksTable from './BooksTable/BooksTable';
import TrainingForm from './TrainingForm/TrainingForm';
import MediaQuery from 'react-responsive';

const Training = () =>{
    return(
        <>
        <Container>
            <MediaQuery minWidth={320} maxWidth={767}>
                <MyGoals/>
                <BookList/>
                <Graphic/>
            </MediaQuery>
            <MediaQuery minWidth={768} maxWidth={1023}>
                <MyGoals/>
                <TrainingForm/>
                <BooksTable/>
                <Graphic/>
            </MediaQuery>
            <MediaQuery minWidth={1024}>
                <MyGoals/>
                <BooksTable/>
                <Graphic/>
            </MediaQuery>
        </Container>
        </>
    )
}

export default Training;