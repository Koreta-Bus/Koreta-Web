import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { InputField } from "components/input-field";
import { Button } from "components/button";
import { Header } from "components/header";
import { Icon } from "shared/IconGenerator";
import { useRouter } from "next/router";
import { WebsitePageLayouts } from "layouts/website";
import { useDispatch, useSelector } from "react-redux";
import { setSeachFormValues } from "store/states";
import { orderFormValidSchema } from "constant";
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

export const OrderForm = ({
  searchValue = false,
  busDirectionsLoading,
  searchedInitialValues,
  getSearchBusDirections,
  needJustLayout = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [fieldName, setFieldName] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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
          personCount: "1",
        };

  useEffect(() => {
    const getDirections = () => {
      if (
        item?.from?.cityId &&
        item?.to?.cityId &&
        item?.formattedDate &&
        item?.personCount &&
        path === "/ticket-search"
      ) {
        getSearchBusDirections({
          from_city_id: item?.from?.cityId,
          to_city_id: item?.to?.cityId,
          departure_date: item?.formattedDate,
          free_seats: item?.personCount,
        }) ?? null;
      } else {
        formik.resetForm();
      }
    };

    getDirections();

    return undefined;
  }, [path]);

  const [
    getAllCities,
    {
      data: searchedCitiesData,
      isSuccess: searchedCitiesSuccess,
      isLoading: searchedCitiesIsLoading,
    },
  ] = useLazyGetAllCitiesQuery();

  useEffect(() => setSearchResult(searchedCitiesData?.body), [searchedCitiesData]);

  const inputFields = [
    {
      id: "from",
      type: "text",
      name: "from",
      icon: "exchange",
      className: "from",
      placeholder: "Звідки",
      containerClass: "gridContainer",
      isLoading: fieldName === "from" && searchedCitiesIsLoading,

    },
    {
      id: "to",
      name: "to",
      type: "text",
      className: "to",
      placeholder: "Куди",
      containerClass: "gridContainer",
      isLoading: fieldName === "to" && searchedCitiesIsLoading,
    },
    {
      date: true,
      className: "date",
    },
    {
      type: "text",
      maxLength: "2",
      icon: "person",
      id: "personCount",
      className: "person",
      name: "personCount",
      placeholder: "Пасажирів",
      containerClass: "personContainer",
    },
  ];

  const formik = useFormik({
    initialValues:
      path === "/"
        ? initialValues
        : Object?.entries(searchedInitialValues ?? {})?.length > 0
        ? searchedInitialValues
        : initialValues,
    validationSchema: orderFormValidSchema(),
    onSubmit: async (values, helpers) => {
      const setToLocaleStorage = () =>
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
      if (!busDirectionsLoading) {
        if (path === "/") {
          dispatch(setSeachFormValues(values));
          router.push(`/ticket-search?from=${values.from}&to=${values.to}`);
          setToLocaleStorage();
        }
        if (path === "/ticket-search") {
          setToLocaleStorage();
          if (from.cityId && to.cityId) {
            (await getSearchBusDirections({
              to_city_id: to.cityId,
              from_city_id: from.cityId,
              free_seats: values.personCount,
              departure_date: dayjs(values.date).format("YYYY-MM-DD").toString(),
            })) ?? null;
          } else {
            formik.setFieldValue("from", "");
            formik.setFieldValue("to", "");

            const currentUrl = window.location.href;
            const baseUrl = currentUrl.split("?")[0];

            const modifiedUrl = baseUrl;
            router.push(modifiedUrl);
          }
        }
      }
    },
  });

  const ishomepage = useMemo(() => path === "/", [router]);
  const validPath = useMemo(() => validPaths.includes(path), [router]);
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
          <TelePhone>Тел: +380 97 146 1991</TelePhone>
        </StyledHeaderMedia>
      </WebsitePageLayouts>
      {!needJustLayout && (
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
                <h3>Пасажирські перевезення в Європу</h3>
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
                        onFocus={() => setSearchResult(null)}
                        icon={input.icon}
                        iconWidth={input.iconWidth}
                        iconHeight={input.iconHeight}
                        iconStyle={input.iconStyle}
                        className={input.className}
                        containerClass={input.containerClass}
                        maxLength={input.maxLength}
                        result={input.name === fieldName && searchResult}
                        setSearchResult={setSearchResult}
                        isLoading={input.isLoading ?? false}
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
      )}
    </>
  );
};
