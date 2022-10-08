import Button from 'components/common/Button';
import ModalWindow from 'components/common/ModalWindow';
import { MdOutlineThumbUp } from 'react-icons/md';
import s from './ModalAllertGreate.module.scss';
function ModalAllertGreate() {
  return (
    <ModalWindow onClose={() => {}}>
      <div className={s.modal}>
        <MdOutlineThumbUp className={s.likeIcon} />
        <p className={s.text}>Congratulations! Another book read.</p>
        <div className={s.buttonWrap}>
          <Button
            variant="filled"
            modifClass={s.button}
            onClose={() => {}}
            onClick={() => {}}
          >
            Done
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
}

export default ModalAllertGreate;
