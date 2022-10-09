import { MdDeleteOutline, MdOutlineMenuBook } from 'react-icons/md';
import { useRemoveBookMutation } from 'redux/books/books-api';

import s from './BooksTableMobile.module.scss';

const BooksTableMobile = ({ books = [] }) => {
  const [removeBook] = useRemoveBookMutation();
  return (
    <ul className={s.list}>
      {books.map(({ _id, title, author, countOfPages, releaseDate }) => (
        <li key={_id} className={s.item}>
          <div className={s.title__wrap}>
            <MdOutlineMenuBook className={s.iconBook} />
            <span className={s.title}>{title}</span>
            <MdDeleteOutline
              className={s.iconDel}
              onClick={() => removeBook(_id)}
            />
          </div>
          <p className={s.text}>
            <span className={s.subtext__title}>Author:</span>
            <span className={s.subtext}>{author}</span>
          </p>
          <p className={s.text}>
            <span className={s.subtext__title}>Year:</span>
            <span className={s.subtext}>{releaseDate}</span>
          </p>
          <p className={s.text}>
            <span className={s.subtext__title}> Pages:</span>
            <span className={s.subtext}>{countOfPages}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default BooksTableMobile;
