import PropTypes from 'prop-types';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import Button from 'components/common/Button';
import s from './GoBackButton.module.scss';

const GoBackButton = ({ onClick }) => {
  return (
    <Button variant="icon" onClick={onClick} modifClass={s.goBackBtn}>
      <span className="visually-hidden">Go back</span>
      <HiOutlineArrowNarrowLeft />
    </Button>
  );
};

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
