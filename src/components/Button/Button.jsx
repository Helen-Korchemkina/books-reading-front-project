import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import s from './Button.module.scss';

const Button = ({
  tag = 'button',
  variant = 'outline',
  modifClass = '',
  isLoading,
  onClick,
  children,
  ...restProps
}) => {
  return React.createElement(
    tag,
    {
      className: classNames({
        [s[variant]]: true,
        [s.loading]: isLoading,
        [modifClass]: Boolean(modifClass),
      }),
      onClick,
      ...restProps,
    },
    children
  );
};

Button.propTypes = {
  tag: PropTypes.oneOf(['button', 'a']),
  variant: PropTypes.oneOf(['outline', 'filled']),
  modifClass: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
