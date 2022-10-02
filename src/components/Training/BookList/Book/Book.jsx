import { MdOutlineMenuBook } from 'react-icons/md';
import classNames from 'classnames';
import s from './Book.module.css';

const Book = () =>{
    return(
    <>
    <li>
        <div className={s.listIcon}>
            <MdOutlineMenuBook
            className={classNames({
                [s.icon]: true,
            })}
            />
            <h2 className={s.listTitle}>...</h2>
        </div>
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