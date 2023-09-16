import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard/layout";
import { CustomersTable } from "sections/customer/customers-table";
import { applyPagination } from "utils/apply-pagination";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "config/firebase";

const TableCells = [
  "Имя",
  "Электронная почта",
  "Описание",
  "Мобильный телефон",
  "Наименование юридического лица",
  'Время отправки запроса',
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [drivers, setDrivers] = useState([]);

  const useCustomers = (page, rowsPerPage, drivers) =>
    useMemo(() => applyPagination(drivers, page, rowsPerPage), [page, rowsPerPage, drivers]);

  const driversInfos = useCustomers(page, rowsPerPage, drivers);

  useEffect(() => {
    const getDrivers = () => {
      let driversRes = [];
      const dbRef = ref(getDatabase(app), "drivers/");
      onValue(dbRef, (snapShot) => {
        snapShot.forEach((childSnapShot) => {
          let key = childSnapShot.key;
          let data = childSnapShot.val();
          driversRes = [...driversRes, { key, data }];
        });
        setDrivers(driversRes);
      });
    };
    getDrivers();
  }, []);

  const handlePageChange = useCallback((_, value) => setPage(value), []);

  const handleRowsPerPageChange = useCallback((event) => setRowsPerPage(event.target.value), []);

  return (
    <>
      <Head>
        <title>Водители | Devias Kit</title>
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
              <Stack spacing={1}>
                <Typography variant="h4">Водители</Typography>
              </Stack>
            </Stack>
            <CustomersTable
              count={drivers?.length}
              items={driversInfos}
              tableCells={TableCells}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
