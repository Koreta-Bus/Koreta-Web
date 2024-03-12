import Swal from "sweetalert2";

export const Popup = ({
  text = "",
  timer = 0,
  icon = "success",
  title = "Authentication",
  showConfirmButton = true,
  confirmButtonText = null,
  confirmButtonColor = '#3085d6',
}) => {
  Swal.fire({
    icon,
    title,
    text,
    timer,
    showConfirmButton,
    confirmButtonColor,
    confirmButtonText: confirmButtonText ?? 'Close'
  });
};
