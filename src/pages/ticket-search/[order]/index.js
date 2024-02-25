import { orderFormTicketValidSchema } from "constant";
import { useFormik } from "formik";
import Head from "next/head";
import { WebsiteColors } from "theme/colors";
import { MainFooter } from "components/website-footer";
import { OrderForm } from "sections/home/order-form";
import { Icon } from "shared/IconGenerator";
import { Button } from "components/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useBroneOrderMutation, useCreateOrderMutation, useGetFreeSeatsQuery } from "store/apis";

import { styled } from "styled-components";
import { Popup } from "shared/alerts";
import { setFormPay } from "store/states";
import { noop } from "shared/common";

const defaultInitialValues = {
  phone: "",
  email: "",
  lastname: "",
  firstname: "",
};

const externalAutobusFields = {
  seat: "",
  transport_id: "",
};

const demandedDirectionFields = {
  to: "",
  from: "",
};  

const defaultPopup = () =>
  Popup({
    timer: 2000,
    icon: "success",
    title: "Вітання!",
    showConfirmButton: false,
    text: "Замовлення було успішно оформлене",
  });

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { orderValues } = useSelector((state) => state.searchBusDirections);

  const [createOrder, { isLoading, data, isSuccess: createOrderSucccess }] =
    useCreateOrderMutation();

  const [broneOrder, { isSuccess: broneSuccess, data: broneData }] = useBroneOrderMutation();

  const { data: freeSeatsData } = useGetFreeSeatsQuery(orderValues?.route_id);

  const isDemandedDirection = router?.asPath === "/ticket-search/demanded-direction";

  useEffect(() => {
    if (!isDemandedDirection) {
      Object.entries(orderValues)?.length < 12 && router.push("/ticket-search");
    }
    return noop;
  }, [orderValues]);

  useEffect(() => {
    if (createOrderSucccess) {
      if (!isDemandedDirection) broneOrder({ order_id: data?.body?.id });

      if (isDemandedDirection) {
        //default time 2000
        defaultPopup();
        setTimeout(() => router.push("/ticket-search"), 2000);
      }
    }

    return noop;
  }, [createOrderSucccess]);

  useEffect(() => {
    if (broneSuccess && !isDemandedDirection) {
      //default time 2000
      defaultPopup();

      setTimeout(() => {
        dispatch(setFormPay(broneData?.body));
        router.push("order/pay");
      }, 2000);
    }

    return noop;
  }, [broneSuccess]);

  const { free_seats: freeSeats, error: freeSeatsError } =
    freeSeatsData?.body?.data?.response ?? {};

  useEffect(() => {
    if (freeSeats?.length === 0) {
      Popup({
        icon: "error",
        title: "Error",
        text: freeSeatsError,
        showConfirmButton: true,
      });
    }

    return noop;
  }, [freeSeatsError]);

  const getInitialValues = useMemo(() => {
    const optionalValues = isDemandedDirection ? externalAutobusFields : demandedDirectionFields;

    return { ...defaultInitialValues, ...optionalValues };
  }, [isDemandedDirection]);

  const formik = useFormik({
    initialValues: getInitialValues,
    validationSchema: orderFormTicketValidSchema(isDemandedDirection),
    onSubmit: async (values, helpers) => {
      const selectedSeats = availableSeats?.find((seats) => seats.seat_id == formik.values.seat);

      try {
        if ((orderValues?.price && !isLoading) || isDemandedDirection) {
          await createOrder({
            to: values?.to,
            from: values?.from,
            name: values?.name,
            email: values?.email,
            surname: values?.surname,
            seat_id: values?.seat || 0,
            phone: values?.mobileNumber,
            seat: selectedSeats?.seat_num,
            price: orderValues?.price || 0,
            route_id: orderValues?.route_id,
            is_microauto: isDemandedDirection,
            transport_id: values?.transport_id || 0,
          });
        }
      } catch (err) {
        Popup({
          timer: 2500,
          icon: "error",
          showConfirmButton: false,
          title: "Форма запроса водителя",
          text: "Что-то пошло не так при отправке запроса",
        });
      }
    },
  });

  const availableSeats = useMemo(
    () =>
      freeSeats?.filter((car) => car.transport_id == formik.values.transport_id)?.[0]?.available,
    [freeSeats, formik]
  );

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
              {isDemandedDirection && (
                <>
                  <FieldWrapper>
                    <label htmlFor="name">
                      Звідки <Icon name="star" />
                    </label>
                    <InputTextField
                      id="from"
                      type="text"
                      name="from"
                      value={formik.values.from}
                      onChange={formik.handleChange}
                    />
                    <ErrorText>{formik.values.from && formik.errors.from}</ErrorText>
                  </FieldWrapper>
                  <FieldWrapper>
                    <label htmlFor="name">
                      Куди <Icon name="star" />
                    </label>
                    <InputTextField
                      id="to"
                      name="to"
                      type="text"
                      value={formik.values.to}
                      onChange={formik.handleChange}
                    />
                    <ErrorText>{formik.values.to && formik.errors.to}</ErrorText>
                  </FieldWrapper>
                </>
              )}
              <FieldWrapper>
                <label htmlFor="name">
                  Ім'я <Icon name="star" />
                </label>
                <InputTextField
                  id="name"
                  type="text"
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
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
                />
                <ErrorText>{formik.values.mobileNumber && formik.errors.mobileNumber}</ErrorText>
              </FieldWrapper>
              <FieldWrapper>
                <label htmlFor="email">Email, веб-сайт (якщо наявні)</label>
                <InputTextField
                  id="email"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <ErrorText>{formik.values.email && formik.errors.email}</ErrorText>
              </FieldWrapper>
              {!isDemandedDirection && (
                <>
                  <FieldWrapper>
                    <label htmlFor="transport_id">
                      Виберіть автомобіль водія <Icon name="star" />
                    </label>
                    <SelectField
                      id="transport_id"
                      name="transport_id"
                      onChange={formik.handleChange}
                      value={formik.values.transport_id}
                    >
                      <option value="" disabled>
                        Оберіть автомобіль
                      </option>
                      {/* Map through your transport_ids data to generate options */}
                      {freeSeats?.map((car) => (
                        <option key={car.id} value={car.transport_id}>
                          {car.description}
                        </option>
                      ))}
                    </SelectField>
                    <ErrorText>
                      {formik.values.transport_id && formik.errors.transport_id}
                    </ErrorText>
                  </FieldWrapper>
                  <FieldWrapper>
                    <label htmlFor="seat">
                      Виберіть місце <Icon name="star" />
                    </label>
                    <SelectField
                      id="seat"
                      name="seat"
                      value={formik.values.seat}
                      onChange={formik.handleChange}
                      disabled={!formik.values.transport_id}
                    >
                      <option value="" disabled>
                        Оберіть місце
                      </option>
                      {/* Map through your freeSeats data to generate options */}
                      {availableSeats?.map((seatDesc) => (
                        <option key={seatDesc?.seat_num} value={seatDesc?.seat_id}>
                          {seatDesc?.seat_num}
                        </option>
                      ))}
                    </SelectField>
                    <ErrorText>{formik.values.seat && formik.errors.seat}</ErrorText>
                  </FieldWrapper>
                </>
              )}
            </DriverFormWrapper>
            <PriceButtonContainer>
              <PriceButtonWrapper>
                {!isDemandedDirection && (
                  <PriceContent>{`Всього: ${orderValues?.price}`}</PriceContent>
                )}
                <ButtonWrapper>
                  <Button padding="10px 0px" type="submit" text={"Надіслати"} loading={isLoading} />
                </ButtonWrapper>
              </PriceButtonWrapper>
            </PriceButtonContainer>
          </StyledDriverForm>
        </DriverFormContainer>
      </Container>

      {!isDemandedDirection && (
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
      )}

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

const SelectField = styled.select`
  padding: 1rem;
  font-family: Sora, sans-serif;
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

  input,
  select {
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
