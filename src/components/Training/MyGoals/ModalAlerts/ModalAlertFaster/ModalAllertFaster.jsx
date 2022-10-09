import s from './ModalAllertFaster.module.scss';

import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';
import { getReadingBooks } from 'redux/books/books-selectors';
import { useSelector } from 'react-redux';
import { useUpdateStatusBookMutation } from 'redux/books/books-api';

function ModalAllertFaster({ click }) {
  const navigate = useNavigate();
  const readingBooks = useSelector(getReadingBooks);
  const [updateStatusBook] = useUpdateStatusBookMutation();

  const handleNewTraining = () => {
    navigate('/library', { replace: true });

    readingBooks.forEach(book =>
      updateStatusBook({
        id: book._id,
        status: 'Already read',
        isReadBook: false,
      })
    );
  };

  return (
    <div className={s.modal}>
      <p className={s.text}>
        Well done! but you need to be a little bit faster. You can do it
      </p>
      <div className={s.buttonWrap}>
        <Button
          variant="filled"
          modifClass={s.button}
          onClick={handleNewTraining}
        >
          New training
        </Button>
        <Button modifClass={s.button} onClick={() => click(false)}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default ModalAllertFaster;
