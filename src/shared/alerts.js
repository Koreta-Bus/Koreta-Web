import Swal from "sweetalert2";

export const Popup = ({
  icon = "success",
  title = "Authentication",
  text = "",
  timer = 0,
  showConfirmButton = true,
  confirmButtonColor = '#3085d6',
  confirmButtonText = null
}) => {
  Swal.fire({
    icon,
    title,
    text,
    timer,
    showConfirmButton,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmButtonText ?? 'Close'
  });
};
