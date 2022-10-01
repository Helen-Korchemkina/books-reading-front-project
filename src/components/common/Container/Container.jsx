import PropTypes from 'prop-types';

import s from './Container.module.scss';

const Container = ({ children, ...restProps }) => {
  return (
    <div className={s.container} {...restProps}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
