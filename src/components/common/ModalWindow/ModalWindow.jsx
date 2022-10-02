import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import s from './ModalWindow.module.scss';

const modalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ children, onClose, modifClass = '' }) => {
  const handleKeyDown = useCallback(
    evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div
        className={classNames({
          [s.container]: true,
          [modifClass]: Boolean(modifClass),
        })}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

ModalWindow.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWindow;
