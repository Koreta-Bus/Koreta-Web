import Head from "next/head";
// TODO DATE
// import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout  } from "layouts/dashboard/layout";
import { OverviewBudget } from "sections/overview/overview-budget";
import { OverviewSales } from "sections/overview/overview-sales";
import { OverviewTasksProgress } from "sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "sections/overview/overview-total-customers";
import { OverviewTraffic } from "sections/overview/overview-traffic";
import { OverviewLatestOrders } from "sections/overview/overview-latest-orders";

const Page = () => (
  <>
    <Head>
      <title>Обзор | Koreta</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={4}>
            <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <OverviewTotalCustomers
              difference={16}
              positive={true}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <OverviewTasksProgress sx={{ height: "100%" }} value="25" />
          </Grid>
          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={["Customers", "Drivers", "Tickets"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <OverviewLatestOrders
              orders={[
                {
                  id: "f69f88012978187a6c12897f",
                  ref: "DEV1049",
                  amount: 30.5,
                  customer: {
                    name: "Ekaterina Tankova",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1555016400000,
                },
                {
                  id: "9eaa1c7dd4433f413c308ce2",
                  ref: "DEV1048",
                  amount: 25.1,
                  customer: {
                    name: "Cao Yu",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1555016400000,
                },
                {
                  ref: "DEV1047",
                  amount: 10.99,
                  customer: {
                    name: "Alexa Richardson",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1554930000000,
                },
                {
                  id: "1f4e1bd0a87cea23cdb83d18",
                  ref: "DEV1046",
                  amount: 96.43,
                  customer: {
                    name: "Anje Keizer",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1554757200000,
                },
                {
                  id: "9f974f239d29ede969367103",
                  ref: "DEV1045",
                  amount: 32.54,
                  customer: {
                    name: "Clarke Gillebert",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1554670800000,
                },
                {
                  id: "ffc83c1560ec2f66a1c05596",
                  ref: "DEV1044",
                  amount: 16.76,
                  customer: {
                    name: "Adam Denisov",
                    email: "example@example.com",
                    phoneNumber: "+994 77 242 12 21",
                    viberNumber: "+994 77 242 12 21",
                  },
                  createdAt: 1554670800000,
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
