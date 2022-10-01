import { toast } from 'react-toastify';

export const toastErrorNotification = {
  id: 'toast1',
  show(text, callback, type = 'error') {
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      type,
      toastId: this.id,
      onClose: () => callback && callback(),
    });
    return this.id;
  },
  hide() {
    toast.dismiss(this.id);
  },
};
