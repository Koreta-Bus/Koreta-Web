import Head from "next/head";

import { Box, Container} from "@mui/material";

import Layout  from "layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Компании | Koreta Bus</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl"></Container>
    </Box>
  </>
);

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
