import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { Layout as AuthLayout } from "layouts/auth/layout";
import { Button } from "components/button";
import { styled } from "styled-components";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "example@gmail.com",
      password: "password",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push("/admin");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
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
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
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
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button type="text" text={"Continue"} />
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

const StyledTypography = styled(Typography)`
   @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
