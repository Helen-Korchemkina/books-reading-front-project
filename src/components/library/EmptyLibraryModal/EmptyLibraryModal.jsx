import { useMediaQuery } from 'react-responsive';
import {
  MdOutlineMenuBook,
  MdOutlinedFlag,
  MdSubdirectoryArrowRight,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';
import s from './EmptyLibraryModal.module.scss';

const EmptyLibraryModal = ({ onConfirmBtnClick }) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className={s.container}>
      <h2 className={s.title}>Step 1.</h2>
      <ul className={s.mainList}>
        <li>
          <MdOutlineMenuBook className={s.icon} /> Create your own library
          <ul className={s.subList}>
            <li>
              <MdSubdirectoryArrowRight className={s.icon} />
              Add there books which you are going to read.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className={s.title}>Step 2.</h2>
      <ul className={s.mainList}>
        <li>
          <MdOutlinedFlag className={s.icon} />
          Create your first training
          <ul className={s.subList}>
            <li>
              <MdSubdirectoryArrowRight className={s.icon} />
              Set a goal, choose period, start training.
            </li>
          </ul>
        </li>
      </ul>

      {isMobileScreen && (
        <Button
          variant="filled"
          onClick={onConfirmBtnClick}
          modifClass={s.button}
        >
          Ok
        </Button>
      )}
    </div>
  );
};

EmptyLibraryModal.propTypes = {
  onConfirmBtnClick: PropTypes.func,
};

export default EmptyLibraryModal;
