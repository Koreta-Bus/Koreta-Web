import Head from "next/head";

import { Box, Container, Stack, Typography } from "@mui/material";

import Layout from "layouts/dashboard/layout";

const SettingsPassword = dynamic(() => import("sections/settings/settings-password"));

const Page = () => (
  <>
    <Head>
      <title>Настройки | Koreta Bus</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Настройки</Typography>
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
