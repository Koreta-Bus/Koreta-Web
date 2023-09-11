import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";

const Page = () => (
  <>
    <Head>
      <title>Home Page</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">Home Page</Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          ></Box>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <>{page}</>;
export default Page;
