import { getDatabase, onValue, ref } from "firebase/database";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Container, Stack, Typography } from "@mui/material";

import { CustomersTable } from "sections/customer/customers-table";

import { applyPagination } from "utils/apply-pagination";

import { app } from "config/firebase";

const SectionDrivers = () => {
  const [page, setPage] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
          driversRes = [...driversRes, { key, ...data }];
        });
        setDrivers(driversRes);
      });
    };
    getDrivers();
  }, []);

  const handlePageChange = useCallback((_, value) => setPage(value), []);

  const handleRowsPerPageChange = useCallback((event) => setRowsPerPage(event.target.value), []);

  return (
      <Box
        component="main"
        sx={{
          py: 8,
          flexGrow: 1,
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
              page={page}
              items={driversInfos}
              count={drivers?.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Stack>
        </Container>
      </Box>
  );
};

export default SectionDrivers;
