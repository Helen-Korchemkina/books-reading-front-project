import classNames from 'classnames';
import { ImSpinner9 } from 'react-icons/im';

import s from './LoadSpinner.module.scss';

const LoadSpinner = ({ modifClass, ...restProps }) => {
  return (
    <ImSpinner9 className={classNames(s.spinner, modifClass)} {...restProps} />
  );
};

export default LoadSpinner;
