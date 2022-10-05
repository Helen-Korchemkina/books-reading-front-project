import Container from '../common/Container/Container';
import MediaQuery from 'react-responsive';
 import BooksTable from './BooksTable/BooksTable';
import Graphic from '../Training/Graphic';
 import TrainingForm from './TrainingForm/TrainingForm';
import MyGoals from './MyGoals'
import Results from './Results'
 import s from './Statistics.module.css';

const Statistics = () =>{
    return(
        <>
        <Container>
            <MediaQuery minWidth={320} maxWidth={767}>
                <MyGoals/>
                    <Graphic />
                     <Results/>
                </MediaQuery>
                
            <MediaQuery minWidth={768} maxWidth={1279}>
                <MyGoals/>
               <TrainingForm/>
                <BooksTable/>
                    <Graphic />
                     <Results/>
            </MediaQuery>
            <MediaQuery minWidth={1280}>
                <div className={s.desctopContainer}>
                    <div className={s.left}>
                       <TrainingForm/>
                            <BooksTable />
                            <Graphic />
                          
                    </div>
                    <div className={s.right}>
                            <MyGoals />
                             <Results/>
                    </div>
                </div>
            </MediaQuery>
        </Container>
        </>
    )
}

export default Statistics;
