import Head from "next/head";
import { Box, Container} from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard/layout";

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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
