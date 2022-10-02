import Book from './Book/Book';
import s from './BookList.module.css';

const BookList = () =>{
    return(
    <>
    <div className={s.container}>
        <div className={s.content}>
        <ul className={s.list}>
           <Book/>
        </ul>
        </div>
    </div>
    </>)
}

export default BookList;