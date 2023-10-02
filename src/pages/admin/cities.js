import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard/layout";
import { CustomersTable } from "sections/customer/customers-table";
import { applyPagination } from "utils/apply-pagination";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "config/firebase";
import { useFormik } from "formik";
import { WebsiteColors } from "theme/colors";
import { Popup } from "shared/alerts";
import { Icon } from "shared/IconGenerator";
import { createdAt } from "shared/date";
import {
  useCreateCityMutation,
  useCreatedCitiesQuery,
  useLazyCreatedCitiesQuery,
} from "store/apis";
import { citiesCreateFormValisSchema } from "constant";

import { styled } from "styled-components";

const TableCells = [
  "С",
  "По",
  "Адрес отправления",
  "Адреса прибытия",
  "Цена",
  "Время создания направлении",
];

const initialValues = {
  from: "",
  to: "",
  price: "",
  uniqueKey: "",
  goesFrom: "",
  goesTo: "До дому",
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [createCity, { error, isSuccess, isLoading: createCityLoading }] = useCreateCityMutation();

  const [
    createdCities,
    { data: createdCitiesData, isSuccess: createdCitiesIsSuccess, isLoading: createdCitiesLoading },
  ] = useLazyCreatedCitiesQuery();

  useEffect(() => {
    const getCities = async () => await createdCities();
    getCities();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      Popup({
        icon: "success",
        title: "Додавання напрямку міста",
        text: "Напрямок міста успішно додано.",
        timer: 1800,
        showConfirmButton: false,
      });
      setTimeout(() => {
        setIsVisibleModal(false);
      }, 1800);
    }
    if (error) {
      Popup({
        icon: "error",
        title: "Додавання напрямку міста",
        text: "Під час додавання напрямку міста сталася помилка.",
        timer: 2500,
        showConfirmButton: true,
      });
    }
  }, [isSuccess, error]);

  const handleClose = useCallback(() => setIsVisibleModal(false), []);
  const handleOpen = useCallback(() => setIsVisibleModal(true), []);

  const useCustomers = (page, rowsPerPage, cities) =>
    useMemo(() => applyPagination(cities, page, rowsPerPage), [page, rowsPerPage, cities]);

  const citiesInfos = (() => {
    const originalData = createdCitiesData?.body?.data;
    const reverseData = originalData ? [...originalData].reverse() : [];
    return useCustomers(page, rowsPerPage, reverseData);
  })();

  const formik = useFormik({
    initialValues,
    validationSchema: citiesCreateFormValisSchema(),
    onSubmit: async (values, helpers) => {
      try {
        await createCity({
          from_city: values?.from,
          to_city: values?.to,
          price: values?.price,
          from_address: values?.goesFrom,
          to_address: values?.goesTo,
          unique_id: values?.uniqueKey,
        });

        await createdCities()
        handleClose();
        formik.setValues(initialValues);
      } catch (err) {
        Popup({
          icon: "error",
          title: "Додавання напрямку міста",
          text: "Під час додавання напрямку міста сталася помилка.",
          timer: 2500,
          showConfirmButton: true,
        });
      }
    },
  });

  const handlePageChange = useCallback((_, value) => setPage(value), []);

  const handleRowsPerPageChange = useCallback((event) => setRowsPerPage(event.target.value), []);

  const handleRowClick = useCallback((rowData) => {
    formik.setValues(rowData);
    setIsVisibleModal(true);
  }, []);

  return (
    <>
      <Head>
        <title>Города | Koreta Bus</title>
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
            <Stack direction="row" justifyContent="space-between" alignItems={"center"} spacing={4}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <StyledTypography variant="h4">Направления городов</StyledTypography>
              </Stack>
              <ButtonWrapper>
                <Button variant="contained" onClick={handleOpen}>
                  Создать направление
                </Button>
              </ButtonWrapper>
              <Modal open={isVisibleModal} onClose={handleClose}>
                <ModalContainer>
                  <ModalWrapperCities>
                    <ModalHeader>
                      <CityAddTitle>Добавление направления в город</CityAddTitle>
                      <IconWrapper onClick={handleClose}>
                        <Icon name="exit" />
                      </IconWrapper>
                    </ModalHeader>
                    <StyledDriverForm onSubmit={formik.handleSubmit}>
                      <DriverFormWrapper>
                        <TextField
                          error={!!(formik.touched.from &&  formik.values.from &&formik.errors.from)}
                          helperText={formik.touched.from && formik.values.from && formik.errors.from}
                          fullWidth
                          label="С"
                          id="from"
                          name="from"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.from}
                        />

                        <TextField
                          error={!!(formik.touched.to && formik.values.to && formik.errors.to)}
                          helperText={formik.touched.to && formik.values.to &&  formik.errors.to}
                          fullWidth
                          label="По"
                          id="to"
                          name="to"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.to}
                        />
                        <TextField
                          error={!!(formik.touched.price && formik.errors.price)}
                          helperText={formik.touched.price && formik.errors.price}
                          fullWidth
                          label="Цена"
                          id="price"
                          name="price"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.price}
                        />
                        <TextField
                          error={!!(formik.touched.uniqueKey && formik.values.uniqueKey && formik.errors.uniqueKey)}
                          helperText={formik.touched.uniqueKey && formik.values.uniqueKey &&formik.errors.uniqueKey}
                          fullWidth
                          label="Уникальный ключ направления"
                          id="uniqueKey"
                          name="uniqueKey"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.uniqueKey}
                        />
                        <TextField
                          error={!!(formik.touched.goesFrom && formik.values.goesFrom && formik.errors.goesFrom)}
                          helperText={formik.touched.goesFrom && formik.values.goesFrom && formik.errors.goesFrom}
                          fullWidth
                          label="Адрес отправления"
                          id="goesFrom"
                          name="goesFrom"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.goesFrom}
                        />
                        <TextField
                          error={!!(formik.touched.goesTo && formik.values.goesTo &&formik.errors.goesTo)}
                          helperText={formik.touched.goesTo && formik.values.goesTo && formik.errors.goesTo}
                          fullWidth
                          label="Адреса прибытия"
                          id="goesTo"
                          name="goesTo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.goesTo}
                        />

                        <ButtonWrapper>
                          <Button variant="contained" type="submit" onClick={handleOpen} fullWidth>
                            Надіслати
                          </Button>
                        </ButtonWrapper>
                      </DriverFormWrapper>
                    </StyledDriverForm>
                  </ModalWrapperCities>
                </ModalContainer>
              </Modal>
            </Stack>
            <CustomersTable
              count={createdCitiesData?.body?.data?.length}
              items={citiesInfos}
              tableCells={TableCells}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onRowClick={handleRowClick}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

const StyledTypography = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IconWrapper = styled.span`
  cursor: pointer;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CityAddTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ModalWrapperCities = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(32, 48, 99, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / span 2;

  .MuiButtonBase-root.MuiButton-root {
    border-radius: 4px;
    padding: 11px 20px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .MuiButtonBase-root.MuiButton-root {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
`;

const DriverFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  input {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(32, 48, 99, 0.25);
    outline: none;
    border: none;

    @media (max-width: 768px) {
      height: 32px;
      width: 100%;
    }
  }

  textarea {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(32, 48, 99, 0.25);
    min-height: 176px;
    outline: none;
    border: none;

    @media (max-width: 768px) {
      height: 136px;
    }
  }

  label {
    color: ${WebsiteColors.BLACK_PRIMARY};
    font-family: Sor, sans-serif;
    font-size: 16px;
    line-height: 24px;
  }
`;

const StyledDriverForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
