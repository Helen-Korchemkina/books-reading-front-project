import { MdDeleteOutline, MdOutlineMenuBook } from 'react-icons/md';

import CheckBox from '../BooksTable/CheckBox';

import s from './BooksTableMobile.module.scss';

const BooksTableMobile = ({ books = [], onDel }) => {
  const iconDelete = status => {
    return status !== 'Going to read' ? 'iconNone' : 'iconDel';
  };

  return (
    <ul className={s.list}>
      {books.map(
        ({
          _id,
          title,
          author,
          countOfPages,
          releaseDate,
          status,
          isReadBook,
        }) => (
          <li key={_id} className={s.item}>
            <div className={s.title__wrap}>
              {isReadBook ? (
                <CheckBox
                  status={status}
                  id={_id}
                  countOfPages={countOfPages}
                />
              ) : (
                <MdOutlineMenuBook className={s.iconBook} />
              )}
              <span className={s.title}>{title}</span>
              <MdDeleteOutline
                className={s[iconDelete(status)]}
                onClick={() => onDel(_id)}
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
        )
      )}
    </ul>
  );
};

export default BooksTableMobile;
