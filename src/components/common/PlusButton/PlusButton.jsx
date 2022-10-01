import PropTypes from 'prop-types';

import Button from 'components/common/Button';
import s from './PlusButton.module.scss';

const PlusButton = ({ onClick }) => {
  return (
    <Button variant="filled" modifClass={s.plusButton} onClick={onClick}>
      <span className="visually-hidden">Show form</span>
    </Button>
  );
};

PlusButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PlusButton;
