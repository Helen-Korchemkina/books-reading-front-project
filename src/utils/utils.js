import { toast } from 'react-toastify';

export const toastErrorNotification = {
  id: 'toast1',
  show(text, callback) {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
      toastId: this.id,
      onClose: () => callback && callback(),
    });
    return this.id;
  },
  hide() {
    toast.dismiss(this.id);
  },
};
