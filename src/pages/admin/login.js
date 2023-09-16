import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { Layout as AuthLayout } from "layouts/auth/layout";
import { styled } from "styled-components";
import { emailAuth } from "config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Popup } from "shared/alerts";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
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
            icon: "error",
            title: "Ошибка аутентификации",
            text: "Aдрес электронной почты или пароль неверный",
            timer: 2000,
            showConfirmButton: false,
          });
        });
    },
  });

  return (
    <>
      <Head>
        <title>Login | Koreta</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
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
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {error && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {error}
                  </Typography>
                )}
                <ButtonWrapper style={{ marginTop: "1rem" }}>
                  <Button variant="contained" fullWidth type="submit">Continue</Button>
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
    </>
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

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
