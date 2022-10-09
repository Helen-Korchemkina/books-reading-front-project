import Button from 'components/common/Button';
import { MdOutlineThumbUp } from 'react-icons/md';
import s from './ModalAllertGreate.module.scss';
import { useUpdateStatusBookMutation } from 'redux/books/books-api';
import { useNavigate } from 'react-router-dom';
import { getReadingBooks } from 'redux/books/books-selectors';
import { useSelector } from 'react-redux';
function ModalAllertGreate() {
  const navigate = useNavigate();
  const [updateStatusBook] = useUpdateStatusBookMutation();
  const readingBooks = useSelector(getReadingBooks);
  const handleNewTraining = () => {
    navigate('/library', { replace: true });

    readingBooks.map(book =>
      updateStatusBook({
        id: book._id,
        status: 'Already read',
        isReadBook: false,
      })
    );
  };

  return (
    <div className={s.modal}>
      <MdOutlineThumbUp className={s.likeIcon} />
      <p className={s.text}>Congratulations! Another book read.</p>
      <div className={s.buttonWrap}>
        <Button
          variant="filled"
          modifClass={s.button}
          onClick={handleNewTraining}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default ModalAllertGreate;
