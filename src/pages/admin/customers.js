import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard/layout";
import { CustomersTable } from "sections/customer/customers-table";
import { applyPagination } from "utils/apply-pagination";
import { useGetAllOrdersQuery } from "store/apis";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery();

  const useCustomers = (page, rowsPerPage, customers) => useMemo(() => applyPagination(customers, page, rowsPerPage), [page, rowsPerPage, data])

  const customersInfos = useCustomers(page, rowsPerPage, data?.body);

  const handlePageChange = useCallback((_, value) => setPage(value), []);

  const handleRowsPerPageChange = useCallback((event) => setRowsPerPage(event.target.value), []);

  useEffect(() => {
    if (isError) {
      Popup({
        icon: "error",
        title: "щось пішло не так",
        timer: 2000,
        showConfirmButton: true,
      });
    }
  }, [isError]);

  return (
    <>
      <Head>
        <title>Клиенты | Koreta Bus</title>
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
                <Typography variant="h4">Клиенты</Typography>
              </Stack>
            </Stack>
            <CustomersTable
              count={data?.body?.length}
              items={customersInfos ?? []}
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
