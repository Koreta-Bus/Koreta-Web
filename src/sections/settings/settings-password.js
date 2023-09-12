import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { Popup } from "shared/alerts";

const initialValues = {
  password: "",
  confirm: "",
  currentPassword: "",
  email: "",
};

const ERROR_MESSAGES = {
  INVALID_PASSWORD: "Пароль или email введены неверно.",
};

export const SettingsPassword = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const reAuthenticateCredential = (currentPassword, newPassword) => {
        const emailAuth = getAuth();
        const user = emailAuth.currentUser;

        if (user) {
          const cred = EmailAuthProvider.credential(user.email, currentPassword);
          reauthenticateWithCredential(user, cred)
            .then(() => {
              changePassword(newPassword);
            })
            .catch((error) => {
              Popup({
                icon: "error",
                title: "Обновление пароля",
                text:
                  ERROR_MESSAGES[error.errors[0].message] ??
                  "Что-то пошло не так во время обновления пароля, ",
                showConfirmButton: true,
              });
            });
        } else {
          Popup({
            icon: "error",
            title: "Аутентификация",
            text: "Не найден авторизованный пользователь.",
            showConfirmButton: true,
          });
        }
      };

      // Function to change the user's password
      const changePassword = (newPassword) => {
        const emailAuth = getAuth();
        const user = emailAuth.currentUser;

        if (user) {
          updatePassword(user, newPassword)
            .then(() => {
              setValues(initialValues);
              Popup({
                icon: "success",
                title: "Обновление пароля",
                text: "Пароль успешно обновлен",
                timer: 2000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              Popup({
                icon: "error",
                title: "Обновление пароля",
                text: "Что-то пошло не так во время обновления пароля",
                showConfirmButton: true,
              });
            });
        } else {
          Popup({
            icon: "error",
            title: "Аутентификация",
            text: "Не найден авторизованный пользователь.",
            showConfirmButton: true,
          });
        }
      };

      if (values?.password === values?.confirm) {
        reAuthenticateCredential(values?.currentPassword, values?.confirm);
      }
    },
    [values]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={handleChange}
              type="text"
              value={values.email}
            />
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              onChange={handleChange}
              type="password"
              value={values.currentPassword}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Repeat Password"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
