import { useState } from "react";

import { useRouter } from "next/navigation";

import { useFormik } from "formik";

import { Alert, Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";

import { styled } from "styled-components";

import { emailAuth } from "config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useAuth } from "hooks/use-auth";

import { Popup } from "shared/alerts";

import { loginFormValidSchema } from "constant";

const SectionLogin = () => {
  const auth = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: loginFormValidSchema(),
    onSubmit: async (values) => {
      return signInWithEmailAndPassword(emailAuth, values.email, values.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          router.push("/admin");
          auth.setIsAuthenticated(user.accessToken);
          auth.signIn();
        })
        .catch((error) => {
          Popup({
            timer: 2000,
            icon: "error",
            showConfirmButton: false,
            title: "Ошибка аутентификации",
            text: "Aдрес электронной почты или пароль неверный",
          });
        });
    },
  });

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        minHeight: '100vh',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: "100px",
          width: "100%",
          maxWidth: 550,
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3, mt: 4 }}>
            <StyledTypography variant="h4">Login</StyledTypography>
          </Stack>
          <Tabs onChange={() => {}} sx={{ mb: 3 }} value={"email"}>
            <Tab label="Email" value="email" />
          </Tabs>
          {
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email Address"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={!!(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Stack>
              {/* {error && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {error}
                </Typography>
              )} */}
              <ButtonWrapper style={{ marginTop: "1rem" }}>
                <Button variant="contained" fullWidth type="submit">
                  Continue
                </Button>
              </ButtonWrapper>
              <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                <div>
                  Admin Login: Unlock <b>Insights</b>, <b>Manage</b> Effortlessly.
                </div>
              </Alert>
            </form>
          }
        </div>
      </Box>
    </Box>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / span 2;

  .MuiButtonBase-root.MuiButton-root {
    border-radius: 8px;
    padding: 13px 20px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .MuiButtonBase-root.MuiButton-root {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
`;

const StyledTypography = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default SectionLogin
