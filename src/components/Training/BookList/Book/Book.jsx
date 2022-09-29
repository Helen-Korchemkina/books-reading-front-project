import s from './Book.module.css';

const Book = () =>{
    return(
    <>
    <li>
        <p className={s.item}>
            <span classname={s.name}>Author:</span> 
            <span className={s.desc}>...</span>
        </p>
        <p className={s.item}>
            <span classname={s.name}>Year:</span> 
            <span className={s.desc}>...</span>
        </p>
        <p className={s.item}>
            <span classname={s.name}>Pages:</span> 
            <span className={s.desc}>...</span>
        </p>
    </li>
    </>)
}

export default Book;