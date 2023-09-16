import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Modal, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard/layout";
import { CustomersTable } from "sections/customer/customers-table";
import { applyPagination } from "utils/apply-pagination";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "config/firebase";
import { useFormik } from "formik";
import { WebsiteColors } from "theme/colors";
import { Popup } from "shared/alerts";
import { Icon } from "shared/IconGenerator";

import * as Yup from "yup";

import { styled } from "styled-components";


const TableCells = ["С", "По", "Цена", "Микро автобус Уникальный ключ"];

const initialValues = {
  from: "",
  to: "",
  price: "",
  microAutobus: "Микро автобус",
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cities, setCitiesDirections] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleClose = useCallback(() => setIsVisibleModal(false), []);
  const handleOpen = useCallback(() => setIsVisibleModal(true), []);

  const useCustomers = (page, rowsPerPage, cities) =>
    useMemo(() => applyPagination(cities, page, rowsPerPage), [page, rowsPerPage, cities]);

  const citiesInfos = useCustomers(page, rowsPerPage, cities);

  useEffect(() => {
    const getDrivers = () => {
      let citiesRes = [];
      const dbRef = ref(getDatabase(app), "cities/");
      onValue(dbRef, (snapShot) => {
        snapShot.forEach((childSnapShot) => {
          let key = childSnapShot.key;
          let data = childSnapShot.val();
          citiesRes = [...citiesRes, { key, data }];
        });
        setCitiesDirections(citiesRes);
      });
    };
    getDrivers();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      from: Yup.string().required("Поле 'Звідки' обов'язкове"),
      to: Yup.string().required('Поле "Куди" обов\'язкове'),
      price: Yup.string().required('Поле "Ціна" обов\'язкове'),
      uniqueKey: Yup.string().required('Поле "Унікальний ключ" обов\'язкове'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const db = getDatabase(app);
        const reference = ref(db, "cities/" + values.uniqueKey);

        set(reference, {
          from: values?.from,
          to: values?.to,
          price: values?.price,
          uniqueKey: values?.uniqueKey,
        });
        formik.setValues(initialValues);
        handleClose();

        setTimeout(() => {
          Popup({
            icon: "success",
            title: "Додавання напрямку міста",
            text: "Напрямок міста успішно додано.",
            timer: 1800,
            showConfirmButton: false,
          });
        }, 300);
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

  return (
    <>
      <Head>
        <title>Cities | Devias Kit</title>
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
                <StyledTypography variant="h4">Cities Directions</StyledTypography>
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
                        <FieldWrapper>
                          <label htmlFor="name">С</label>
                          <InputTextField
                            type="text"
                            id="from"
                            name="from"
                            value={formik.values.from}
                            onChange={formik.handleChange}
                          />
                          <ErrorText>
                            {formik.values.from && formik.touched.from && formik.errors.from}
                          </ErrorText>
                        </FieldWrapper>
                        <FieldWrapper>
                          <label htmlFor="mobileNumber">По</label>
                          <InputTextField
                            type="text"
                            id="to"
                            name="to"
                            value={formik.values.to}
                            onChange={formik.handleChange}
                          />
                          <ErrorText>
                            {formik.values.to && formik.touched.to && formik.errors.to}
                          </ErrorText>
                        </FieldWrapper>
                        <FieldWrapper>
                          <label htmlFor="nameOfLegalEntity">Цена</label>
                          <InputTextField
                            type="text"
                            id="price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                          />
                          <ErrorText>
                            {formik.values.price && formik.touched.price && formik.errors.price}
                          </ErrorText>
                        </FieldWrapper>
                        <FieldWrapper>
                          <label htmlFor="uniqueKey">Уникальный ключ направления</label>
                          <InputTextField
                            type="text"
                            id="uniqueKey"
                            name="uniqueKey"
                            onChange={formik.handleChange}
                            value={formik.values.uniqueKey}
                          />
                          <ErrorText>
                            {formik.values.uniqueKey &&
                              formik.touched.uniqueKey &&
                              formik.errors.uniqueKey}
                          </ErrorText>
                        </FieldWrapper>
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
              count={cities?.length}
              items={citiesInfos}
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

const ErrorText = styled.div`
  width: 100%;
  color: red;
  font-family: Sora, sans-serif;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InputTextField = styled.input`
  padding: 1rem;
  font-family: Sora, sans-serif;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / span 2;

  .MuiButtonBase-root.MuiButton-root {
    border-radius: 4px;
    padding: 13px 20px;
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
    height: 48px;
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

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Sora, sans-serif;
  grid-column: ${({ textarea }) => {
    return textarea ? "1 / span 2" : "";
  }};

  @media (max-width: 768px) {
    label {
      font-size: 0.9rem;
    }
  }
`;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
