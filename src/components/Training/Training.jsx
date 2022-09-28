import Container from '../Container/Container';
import MyGoals from './MyGoals/MyGoals';
import BookList from './BookList/BookList';
import Graphic from './Graphic/Graphic';
import TrainingForm from './TrainingForm/TrainingForm';

const Training = () =>{
    return(
        <>
        <Container>
            <MyGoals/>
            <BookList/>
            <Graphic/>
            <TrainingForm/>
        </Container>
        </>
    )
}

export default Training;