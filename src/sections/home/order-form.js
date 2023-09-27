import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { InputField } from "components/input-field";
import { Button } from "components/button";
import { Header } from "components/header";
import { Icon } from "shared/IconGenerator";
import { useRouter } from "next/router";
import { WebsitePageLayouts } from "layouts/website";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setSeachFormValues } from "store/states";
import { orderFormValidSchema } from "constant";
import { format, parseISO } from "date-fns";
import { useLazyGetAllCitiesQuery } from "store/apis";
import {
  ContactDetail,
  CustomDatePicker,
  FormWrapper,
  KvitkiText,
  OrderFormContainer,
  OrderFormTitle,
  OrderFormWrapper,
  SearchCityValues,
  StyledDatePickerTextField,
  StyledDesktopDatePicker,
  StyledHeaderMedia,
  StyledMobileDatePicker,
  StyledOnlyMedia,
  TelePhone,
  TransparentDiv,
} from "./styled.order.form";
import { SocialMedia } from "shared/socialMedia";
import dayjs from "dayjs";

const validPaths = ["/", "/ticket-search"];

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 1, 11, 31);

function DateIcon(props) {
  return <Icon name="calendar" {...props} />;
}

const inputFields = [
  {
    id: "from",
    type: "text",
    name: "from",
    placeholder: "Звідки",
    icon: "exchange",
    className: "from",
    containerClass: "gridContainer",
  },
  {
    id: "to",
    type: "text",
    name: "to",
    placeholder: "Куди",
    className: "to",
    containerClass: "gridContainer",
  },
  {
    date: true,
    className: "date",
  },
  {
    id: "personCount",
    type: "text",
    name: "personCount",
    placeholder: "Пасажирів",
    icon: "person",
    className: "person",
    containerClass: "personContainer",
    maxLength: "2",
  },
];

export const OrderForm = ({
  searchedInitialValues,
  searchValue = false,
  getSearchBusDirections,
  busDirectionsLoading,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [fieldName, setFieldName] = useState("");

  const { from, to } = useSelector((state) => state.searchBusDirections);

  const path = router.asPath.split("?")[0];

  const item =
    localStorage.getItem("orderForm") !== undefined
      ? JSON.parse(localStorage.getItem("orderForm"))
      : {};

  const initialValues =
    item?.from?.cityName && item?.to?.cityName && item?.date && item?.personCount
      ? {
          from: item?.from?.cityName ?? null,
          to: item?.to?.cityName ?? null,
          date: item?.date ?? null,
          personCount: item?.personCount ?? null,
        }
      : {
          from: "",
          to: "",
          date: "",
          personCount: "",
        };

  useEffect(() => {
    const getDirections = async () => {
      if (
        item?.from &&
        item?.to &&
        item?.formattedDate &&
        item?.personCount &&
        path === "/ticket-search"
      ) {
        (await getSearchBusDirections({
          from_city_id: item?.from?.cityId,
          to_city_id: item?.to?.cityId,
          departure_date: item?.formattedDate,
          free_seats: item?.personCount,
        })) ?? null;
      }
    };

    getDirections();
  }, []);

  const [
    getAllCities,
    {
      data: searchedCitiesData,
      isSuccess: searchedCitiesSuccess,
      isLoading: searchedCitiesIsLoading,
    },
  ] = useLazyGetAllCitiesQuery();

  const formik = useFormik({
    initialValues:
      path === "/"
        ? initialValues
        : Object?.entries(searchedInitialValues ?? {})?.length > 0
        ? searchedInitialValues
        : initialValues,
    validationSchema: orderFormValidSchema(),
    onSubmit: async (values, helpers) => {
      if (!busDirectionsLoading) {
        if (path === "/") {
          dispatch(setSeachFormValues(values));
          router.push(`/ticket-search?from=${values.from}&to=${values.to}`);
        }
        if (path === "/ticket-search") {
          window.localStorage.setItem(
            "orderForm",
            JSON.stringify({
              from,
              to,
              date: values?.date,
              personCount: values?.personCount,
              formattedDate: dayjs(values.date).format("YYYY-MM-DD").toString(),
            })
          );
          (await getSearchBusDirections({
            from_city_id: from.cityId,
            to_city_id: to.cityId,
            free_seats: values.personCount,
            departure_date: dayjs(values.date).format("YYYY-MM-DD").toString(),
          })) ?? null;
        }
      }
    },
  });

  const validPath = useMemo(() => validPaths.includes(path), [router]);
  const ishomepage = useMemo(() => path === "/", [router]);
  const isSearchResult = useMemo(() => path === "/ticket-search", [router]);

  function customDebounce(func, wait) {
    let timeout;

    return function (...args) {
      const context = this;

      const later = function () {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedGetAllCities = useMemo(() => {
    return customDebounce(async (inputValue) => {
      if (inputValue) {
        await getAllCities(inputValue);
      }
    }, 350);
  }, []);

  return (
    <>
      <WebsitePageLayouts>
        <StyledHeaderMedia>
          <StyledOnlyMedia>
            {SocialMedia?.map(({ key, icon, path }) => (
              <ContactDetail key={key} href={path} target="_blank">
                <span>
                  <Icon name={icon} />
                </span>
              </ContactDetail>
            ))}
          </StyledOnlyMedia>
          <TelePhone>Тел: +380 73 216 6696</TelePhone>
        </StyledHeaderMedia>
      </WebsitePageLayouts>
      <OrderFormContainer ishomepage={validPath}>
        <Header />
        <TransparentDiv ishomepage={validPath} />
        <OrderFormWrapper ishomepage={validPath} isSearchResult={isSearchResult}>
          <OrderFormTitle ishomepage={ishomepage} isSearchResult={isSearchResult}>
            <KvitkiText isSearchResult={isSearchResult}>
              Квитки на автобус і мікроавтобус
            </KvitkiText>
            {isSearchResult ? (
              <SearchCityValues>
                <span>
                  {formik.values.from ?? from.cityName ?? item?.from?.cityName ?? "Звідки"}
                </span>
                <span>-</span>
                <span>{formik.values.to ?? to.cityName ?? item?.to?.cityName ?? "Куди"}</span>
              </SearchCityValues>
            ) : (
              <>
                <h3>Пасажирські перевезення в Європу</h3>
              </>
            )}
          </OrderFormTitle>
          {validPath && (
            <FormWrapper onSubmit={formik.handleSubmit}>
              {inputFields.map((input) => {
                return input?.date ? (
                  <div className="datePickerContainer" key={input?.name}>
                    <StyledMobileDatePicker>
                      <CustomDatePicker
                        isMobile={true}
                        fontSize={formik.values["date"] === "Дата"}
                        placeholder={"Date"}
                        value={formik.values["date"]}
                        onChange={(newValue) => formik.setFieldValue("date", newValue)}
                        renderInput={(params) => (
                          <StyledDatePickerTextField
                            borderRed={!!(formik.touched["date"] && formik.errors["date"])}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "Дата",
                            }}
                          />
                        )}
                        components={{
                          OpenPickerIcon: DateIcon,
                        }}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    </StyledMobileDatePicker>
                    <StyledDesktopDatePicker
                      borderRed={!!(formik.touched["date"] && formik.errors["date"])}
                    >
                      <CustomDatePicker
                        fontSize={formik.values["date"] === "Дата"}
                        value={formik.values["date"]}
                        onChange={(newValue) => formik.setFieldValue("date", newValue)}
                        renderInput={(params) => (
                          <StyledDatePickerTextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: "Дата",
                            }}
                          />
                        )}
                        components={{
                          OpenPickerIcon: DateIcon,
                        }}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    </StyledDesktopDatePicker>
                  </div>
                ) : (
                  <>
                    <InputField
                      formik={formik}
                      key={input.id}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={formik.values[input.name]}
                      onChange={(e) => {
                        const { value } = e.target;
                        formik.handleChange(e);
                        if (fieldName !== input.name) setFieldName(input.name);

                        debouncedGetAllCities(value);
                      }}
                      icon={input.icon}
                      iconWidth={input.iconWidth}
                      iconHeight={input.iconHeight}
                      iconStyle={input.iconStyle}
                      className={input.className}
                      containerClass={input.containerClass}
                      maxLength={input.maxLength}
                      result={input.name === fieldName ? searchedCitiesData?.body : ""}
                      borderRed={!!(formik.touched[input.name] && formik.errors[input.name])}
                    />
                  </>
                );
              })}
              <Button
                text="Пошук"
                type={"submit"}
                className={"gridContainer"}
                loading={busDirectionsLoading}
              />
            </FormWrapper>
          )}
        </OrderFormWrapper>
      </OrderFormContainer>
    </>
  );
};
