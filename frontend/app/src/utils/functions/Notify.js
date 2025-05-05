import { toast } from 'react-toastify';

export default function notify(code = 400, message = '') {
  if (code >= 200 && code < 300) {
    toast.success(message);
  }
  if (code >= 400 && code < 500) {
    toast.warn(message);
  }
  if (code === 500) {
    toast.error(message);
  }
}
