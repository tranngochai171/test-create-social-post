import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AUTO_CLOSE_TIMER = 5000; // milliseconds

const mySwal = withReactContent(Swal);

export const ICON = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const toast = mySwal.mixin({
  toast: true,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: AUTO_CLOSE_TIMER,
  timerProgressBar: true,
  showCloseButton: true,
});

type ToastProps = {
  title?: string;
  timer?: number;
};

export const successToast = ({
  title = 'Successfully!',
  ...rest
}: ToastProps = {}) => {
  // @ts-ignore
  return toast.fire({
    icon: ICON.SUCCESS,
    title,
    ...rest,
  });
};

export const errorToast = ({
  title = 'Something went wrong!',
  ...rest
}: ToastProps = {}) => {
  // @ts-ignore
  return toast.fire({
    icon: ICON.ERROR,
    title,
    ...rest,
  });
};

export default mySwal;
