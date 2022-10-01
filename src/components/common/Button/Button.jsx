import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import LoadSpinner from 'components/common/LoadSpinner';
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
        [modifClass]: Boolean(modifClass),
      }),
      onClick,
      type: 'button',
      ...restProps,
    },
    <span>
      {children} {isLoading && <LoadSpinner modifClass={s.spinner} />}
    </span>
  );
};

Button.propTypes = {
  tag: PropTypes.oneOf(['button', 'a']),
  variant: PropTypes.oneOf(['outline', 'filled', 'icon']),
  modifClass: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
