import { useCallback, useState } from "react";

import {
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  CardActions,
  CardContent,
} from "@mui/material";

import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { Popup } from "shared/alerts";

const initialValues = {
  email: "",
  confirm: "",
  password: "",
  currentPassword: "",
};

const ERROR_MESSAGES = {
  INVALID_PASSWORD: "Пароль или email введены неверно.",
};

const SettingsPassword = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    (event) =>
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    []
  );

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
                showConfirmButton: true,
                title: "Обновление пароля",
                text:
                  ERROR_MESSAGES[error.errors[0].message] ??
                  "Что-то пошло не так во время обновления пароля, ",
                });
              });
        } else {
          Popup({
            icon: "error",
            title: "Аутентификация",
            showConfirmButton: true,
            text: "Не найден авторизованный пользователь.",
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
                timer: 2000,
                icon: "success",
                showConfirmButton: false,
                title: "Обновление пароля",
                text: "Пароль успешно обновлен",
              });
            })
            .catch((error) => {
              Popup({
                icon: "error",
                showConfirmButton: true,
                title: "Обновление пароля",
                text: "Что-то пошло не так во время обновления пароля",
              });
            });
        } else {
          Popup({
            icon: "error",
            title: "Аутентификация",
            showConfirmButton: true,
            text: "Не найден авторизованный пользователь.",
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
              type="text"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="password"
              name="currentPassword"
              onChange={handleChange}
              label="Current Password"
              value={values.currentPassword}
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              value={values.password}
            />
            <TextField
              fullWidth
              name="confirm"
              type="password"
              value={values.confirm}
              label="Repeat Password"
              onChange={handleChange}
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

export default SettingsPassword;
