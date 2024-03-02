import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Container, Stack, Typography } from "@mui/material";

import { useGetAllOrdersQuery } from "store/apis";

import { applyPagination } from "utils/apply-pagination";

import { CustomersTable } from "sections/customer/customers-table";

const SectionCustomers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isError } = useGetAllOrdersQuery();

  const useCustomers = (page, rowsPerPage, customers) =>
    useMemo(() => applyPagination(customers, page, rowsPerPage), [page, rowsPerPage, data]);

  const customersInfos = useCustomers(page, rowsPerPage, data?.body);

  const handlePageChange = useCallback((_, value) => setPage(value), []);

  const handleRowsPerPageChange = useCallback((event) => setRowsPerPage(event.target.value), []);

  useEffect(() => {
    if (isError) {
      Popup({
        timer: 2000,
        icon: "error",
        showConfirmButton: true,
        title: "щось пішло не так",
      });
      return undefined;
    }
  }, [isError]);

  return (
    <Box
      sx={{
        py: 8,
        flexGrow: 1,
      }}
      component="main"
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Клиенты</Typography>
            </Stack>
          </Stack>
          <CustomersTable
            page={page}
            rowsPerPage={rowsPerPage}
            count={data?.body?.length}
            items={customersInfos ?? []}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default SectionCustomers;
