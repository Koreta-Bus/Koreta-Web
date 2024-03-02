import { useFormik } from "formik";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";

import { Popup } from "shared/alerts";
import { Icon } from "shared/IconGenerator";

import { WebsiteColors } from "theme/colors";
import { applyPagination } from "utils/apply-pagination";

import { useCreateCityMutation, useLazyCreatedCitiesQuery } from "store/apis";

import { citiesCreateFormValisSchema } from "constant";

import { styled } from "styled-components";
import { CustomersTable } from "sections/customer/customers-table";

const TableCells = [
  "С",
  "По",
  "Адрес отправления",
  "Адреса прибытия",
  "Цена",
  "Время создания направлении",
];

const initialValues = {
  to: "",
  from: "",
  price: "",
  goesFrom: "",
  uniqueKey: "",
  goesTo: "До дому",
};

const SectionCities = () => {
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
        timer: 1800,
        icon: "success",
        showConfirmButton: false,
        title: "Додавання напрямку міста",
        text: "Напрямок міста успішно додано.",
      });
      setTimeout(() => {
        setIsVisibleModal(false);
      }, 1800);
    }
    if (error) {
      Popup({
        timer: 2500,
        icon: "error",
        showConfirmButton: true,
        title: "Додавання напрямку міста",
        text: "Під час додавання напрямку міста сталася помилка.",
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
          to_city: values?.to,
          price: values?.price,
          from_city: values?.from,
          to_address: values?.goesTo,
          unique_id: values?.uniqueKey,
          from_address: values?.goesFrom,
        });

        await createdCities();
        handleClose();
        
        formik.setValues(initialValues);
      } catch (err) {
        Popup({
          timer: 2500,
          icon: "error",
          showConfirmButton: true,
          title: "Додавання напрямку міста",
          text: "Під час додавання напрямку міста сталася помилка.",
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
                        label="С"
                        fullWidth
                        id="from"
                        name="from"
                        type="text"
                        onBlur={formik.handleBlur}
                        value={formik.values.from}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.from && formik.values.from && formik.errors.from)}
                        helperText={formik.touched.from && formik.values.from && formik.errors.from}
                      />

                      <TextField
                        id="to"
                        name="to"
                        fullWidth
                        label="По"
                        type="text"
                        value={formik.values.to}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.to && formik.values.to && formik.errors.to}
                        error={!!(formik.touched.to && formik.values.to && formik.errors.to)}
                      />
                      <TextField
                        fullWidth
                        id="price"
                        type="text"
                        name="price"
                        label="Цена"
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.price && formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.uniqueKey &&
                            formik.values.uniqueKey &&
                            formik.errors.uniqueKey
                          )
                        }
                        helperText={
                          formik.touched.uniqueKey &&
                          formik.values.uniqueKey &&
                          formik.errors.uniqueKey
                        }
                        fullWidth
                        type="text"
                        id="uniqueKey"
                        name="uniqueKey"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.uniqueKey}
                        label="Уникальный ключ направления"
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.goesFrom &&
                            formik.values.goesFrom &&
                            formik.errors.goesFrom
                          )
                        }
                        helperText={
                          formik.touched.goesFrom &&
                          formik.values.goesFrom &&
                          formik.errors.goesFrom
                        }
                        fullWidth
                        type="text"
                        id="goesFrom"
                        name="goesFrom"
                        label="Адрес отправления"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.goesFrom}
                      />
                      <TextField
                        error={
                          !!(formik.touched.goesTo && formik.values.goesTo && formik.errors.goesTo)
                        }
                        helperText={
                          formik.touched.goesTo && formik.values.goesTo && formik.errors.goesTo
                        }
                        fullWidth
                        type="text"
                        id="goesTo"
                        name="goesTo"
                        label="Адреса прибытия"
                        onBlur={formik.handleBlur}
                        value={formik.values.goesTo}
                        onChange={formik.handleChange}
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
            page={page}
            items={citiesInfos}
            tableCells={TableCells}
            rowsPerPage={rowsPerPage}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            count={createdCitiesData?.body?.data?.length}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Stack>
      </Container>
    </Box>
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

export default SectionCities;
