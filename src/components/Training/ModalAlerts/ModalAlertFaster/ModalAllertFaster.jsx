import Button from 'components/common/Button';
import ModalWindow from 'components/common/ModalWindow';

import s from './ModalAllertFaster.module.scss';

function ModalAllertFaster() {
  return (
    <ModalWindow onClose={() => {}}>
      <div className={s.modal}>
        <p className={s.text}>
          Well done! but you need to be a little bit faster. You can do it
        </p>
        <div className={s.buttonWrap}>
          <Button
            variant="filled"
            modifClass={s.button}
            onClose={() => {}}
            onClick={() => {}}
          >
            New training
          </Button>
          <Button modifClass={s.button} onClick={() => {}} onClose={() => {}}>
            Back
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
}

export default ModalAllertFaster;
