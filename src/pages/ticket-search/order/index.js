import { orderFormTicketValidSchema } from "constant";
import { useFormik } from "formik";
import Head from "next/head";
import { WebsiteColors } from "theme/colors";
import { MainFooter } from "components/website-footer";
import { OrderForm } from "sections/home/order-form";
import { Icon } from "shared/IconGenerator";
import { Button } from "components/button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCreateOrderMutation } from "store/apis";

import { styled } from "styled-components";

const initialValues = {
  name: "",
  surname: "",
  mobileNumber: "",
  email: "",
};

const Page = () => {
  const router = useRouter();
  const { orderValues } = useSelector((state) => state.searchBusDirections);

  const [createOrder, { data, isError, isLoading, isSuccess }] = useCreateOrderMutation();

  useEffect(() => {
    if (Object.entries(orderValues)?.length < 12) {
      router.push("/ticket-search");
    }
  }, [orderValues]);

  const formik = useFormik({
    initialValues,
    validationSchema: orderFormTicketValidSchema(),
    onSubmit: async (values, helpers) => {
      try {
        if (orderValues?.price && !isLoading) {
          await createOrder({
            name: values?.name,
            surname: values?.surname,
            phone: values?.mobileNumber,
            email: values?.email,
            price: orderValues?.price,
          });
          router.push("/ticket-search/order/success");
        }
      } catch (err) {
        Popup({
          icon: "error",
          title: "Форма запроса водителя",
          text: "Что-то пошло не так при отправке запроса",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Koreta | Bus Ticket Order</title>
      </Head>
      <OrderForm />
      <Container>
        <h2>Бронювання</h2>
        <DriverFormContainer>
          <FormTitle>Пасажир</FormTitle>
          <StyledDriverForm onSubmit={formik.handleSubmit}>
            <DriverFormWrapper>
              <FieldWrapper>
                <label htmlFor="name">
                  Ім'я <Icon name="star" />
                </label>
                <InputTextField
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <ErrorText>{formik.values.name && formik.errors.name}</ErrorText>
              </FieldWrapper>
              <FieldWrapper>
                <label htmlFor="surname">
                  Прізвище <Icon name="star" />
                </label>
                <InputTextField
                  type="text"
                  id="surname"
                  name="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                />
                <ErrorText>{formik.values.surname && formik.errors.surname}</ErrorText>
              </FieldWrapper>
              <FieldWrapper>
                <label htmlFor="mobileNumber">
                  Номер телефону <Icon name="star" />
                </label>
                <InputTextField
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                />
                <ErrorText>{formik.values.mobileNumber && formik.errors.mobileNumber}</ErrorText>
              </FieldWrapper>
              <FieldWrapper>
                <label htmlFor="email">Email, веб-сайт (якщо наявні)</label>
                <InputTextField
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <ErrorText>{formik.values.email && formik.errors.email}</ErrorText>
              </FieldWrapper>
            </DriverFormWrapper>
            <PriceButtonContainer>
              <PriceButtonWrapper>
                <PriceContent>{`Всього: ${orderValues?.price}`}</PriceContent>
                <ButtonWrapper>
                  <Button padding="10px 0px" type="submit" text={"Надіслати"} loading={isLoading} />
                </ButtonWrapper>
              </PriceButtonWrapper>
            </PriceButtonContainer>
          </StyledDriverForm>
        </DriverFormContainer>
      </Container>

      <WriteUsContainer>
        <WriteUsTitle>Деталі обраної поїздки</WriteUsTitle>
        <DetailContainer>
          <DetailWrapper>
            <DetailItemnWrapper>
              <ItemTitle>{`Перевізник:`}</ItemTitle>
              <ItemValue>{`${orderValues?.carrier_name}`}</ItemValue>
            </DetailItemnWrapper>
            <DetailItemnWrapper>
              <ItemTitle>{`Тип:`}</ItemTitle>
              <ItemValue>{`${orderValues?.is_microauto ? "Microbus" : "Bus"}`}</ItemValue>
            </DetailItemnWrapper>
            <DetailItemnWrapper>
              <ItemTitle>{`Дата відвантаження:`}</ItemTitle>
              <ItemValue>{`${orderValues?.date_departure}`}</ItemValue>
            </DetailItemnWrapper>
            <StreetLocations>{`${
              (orderValues?.from_city, orderValues?.from_station)
            }`}</StreetLocations>
          </DetailWrapper>
          <Divider></Divider>
          <DetailWrapper>
            <DetailItemnWrapper>
              <ItemTitle>{`Дата прибуття:`}</ItemTitle>
              <ItemValue>{`${orderValues?.date_arrival}`}</ItemValue>
            </DetailItemnWrapper>
            <StreetLocations>{`${
              (orderValues?.to_city, orderValues?.to_station)
            }`}</StreetLocations>
          </DetailWrapper>
        </DetailContainer>
      </WriteUsContainer>
      <MainFooter />
    </>
  );
};

const StreetLocations = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  text-transform: uppercase;
  font-weight: 500;
`;

const ItemValue = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-weight: 500;
`;

const ItemTitle = styled.span`
  color: #6a7682;
  font-size: 16px;
`;

const DetailItemnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Divider = styled.div`
  height: 92px;
  width: 2px;
  background-color: ${WebsiteColors.PRIMARY};
  align-self: center;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
`;

const WriteUsContainer = styled.div`
  padding: 48px;
  width: 100%;
  max-width: 1220px;
  border: 1px solid #6a7682;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
  margin-bottom: 96px;
`;

const WriteUsTitle = styled.span`
  color: ${WebsiteColors.PRIMARY};
  font-family: Lora, sans-serif;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const Container = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 48px 0 80px 0;

  h2 {
    color: ${WebsiteColors.PRIMARY};
    font-family: Lora, sans-serif;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;

    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  }
`;

const ErrorText = styled.div`
  width: 100%;
  color: red;
  font-family: Sora, sans-serif;
`;

const InputTextField = styled.input`
  padding: 1rem;
  font-family: Sora, sans-serif;
`;

const PriceButtonContainer = styled.div`
  width: 100%;
  border-top: 2px solid ${WebsiteColors.PRIMARY};
`;

const PriceButtonWrapper = styled.div`
  width: 306px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  align-items: center;
  margin-top: 80px;
`;

const PriceContent = styled.span`
  color: #000;
  font-size: 24px;
  line-height: 32px;
  font-family: Sora, sans-serif;
`;

const ButtonWrapper = styled.div`
  width: 304px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Sora, sans-serif;
  grid-column: ${({ textarea }) => {
    return textarea ? "1 / span 2" : "";
  }};
`;

const DriverFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding-bottom: 4rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
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

const FormTitle = styled.h2`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-family: Sora, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const DriverFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  gap: 32px;
  width: 100%;
  margin: 0 auto;
  max-width: 1220px;
  padding: 48px 48px 48px 48px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 28px;
    margin-top: 32px;
  }
`;

Page.getLayout = (page) => <>{page}</>;

export default Page;
