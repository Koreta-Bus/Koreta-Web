import React, { Fragment, useMemo } from "react";
import { useFormik } from "formik";
import { InputField } from "components/input-field";
import { Button } from "components/button";
import { TextField } from "@mui/material";
import { WebsiteColors } from "theme/colors";
import { Header } from "components/header";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { Icon } from "shared/IconGenerator";
import { useRouter } from "next/router";
import { WebsitePageLayouts } from "layouts/website";

import * as Yup from "yup";

import styled from "styled-components";

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
  },
];

export const SocialMedia = [
  {
    key: "Instagram",
    title: "Instagram",
    icon: "instagram_bold",
  },
  {
    key: "Facebook",
    title: "Facebook",
    icon: "facebook_bold",
  },
  {
    key: "Telegram",
    title: "Telegram",
    icon: "telegram_bold",
  },
];

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 1, 11, 31);

function DateIcon(props) {
  return <Icon name="calendar" {...props} />;
}

export const OrderForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      date: "Дата",
      personCount: "",
    },
    validationSchema: Yup.object({
      from: Yup.string().required('Поле "Звідки" обов\'язкове'),
      to: Yup.string().required('Поле "Куди" обов\'язкове'),
      date: Yup.string().notOneOf(["Дата"], "Виберіть дату").required('Поле "Дата" обов\'язкове'),
      personCount: Yup.number()
        .typeError('Поле "Кількість осіб" повинно бути числовим значенням')
        .integer('Поле "Кількість осіб" повинно бути цілим числом')
        .min(1, 'Поле "Кількість осіб" повинно бути більше або дорівнювати 1')
        .required('Поле "Кількість осіб" обов\'язкове'),
    }),
    onSubmit: (values, helpers) => {
      // Handle form submission
    },
  });

  const submitHandler = () => {
    // Handle submit
  };

  const ishomepage = useMemo(() => router?.asPath === "/", [router]);

  return (
    <>
      <WebsitePageLayouts>
        <StyledHeaderMedia>
          <StyledOnlyMedia>
            {SocialMedia?.map(({ key, icon }) => (
              <ContactDetail key={key}>
                <span>
                  <Icon name={icon} />
                </span>
              </ContactDetail>
            ))}
          </StyledOnlyMedia>
          <span>Тел: +38 xxx xxx xxx</span>
        </StyledHeaderMedia>
      </WebsitePageLayouts>
      <OrderFormContainer ishomepage={ishomepage}>
        <Header />
        <TransparentDiv ishomepage={ishomepage} />
        <OrderFormWrapper ishomepage={ishomepage}>
          <OrderFormTitle ishomepage={ishomepage}>
            <h1>Квитки на автобус і мікроавтобус</h1>
            <h3>Пасажирські перевезення в Європу</h3>
          </OrderFormTitle>
          {router?.asPath === "/" && (
            <FormWrapper onSubmit={submitHandler}>
              {inputFields.map((input) => {
                return input?.date ? (
                  <Fragment key={input?.name}>
                    <StyledMobileDatePicker>
                      <CustomDatePicker
                        isMobile={true}
                        fontSize={formik.values["date"] === "Дата"}
                        placeholder={"Date"}
                        inputFormat="DD.MM.YYYY"
                        value={formik.values["date"]}
                        onChange={(newValue) => formik.setFieldValue("date", newValue)}
                        renderInput={(params) => (
                          <TextField
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
                    <StyledDesktopDatePicker>
                      <CustomDatePicker
                        fontSize={formik.values["date"] === "Дата"}
                        value={formik.values["date"]}
                        inputFormat="DD.MM.YYYY"
                        onChange={(newValue) => formik.setFieldValue("date", newValue)}
                        renderInput={(params) => (
                          <TextField
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
                  </Fragment>
                ) : (
                  <InputField
                    key={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={formik.values[input.name]}
                    onChange={formik.handleChange}
                    icon={input.icon}
                    iconWidth={input.iconWidth}
                    iconHeight={input.iconHeight}
                    iconStyle={input.iconStyle}
                    className={input.className}
                    containerClass={input.containerClass}
                  />
                );
              })}

              <Button text="Пошук" className={"gridContainer"} onClick={() => {}} />
            </FormWrapper>
          )}
        </OrderFormWrapper>
      </OrderFormContainer>
    </>
  );
};

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${WebsiteColors.BLACK_PRIMARY};

  svg {
    cursor: pointer;
  }

  :first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledOnlyMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledHeaderMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledMobileDatePicker = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledDesktopDatePicker = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomDatePicker = styled(({ isMobile, fontSize, ...props }) =>
  isMobile ? <MobileDatePicker {...props} /> : <DesktopDatePicker {...props} />
)`
  border: none;
  outline: none;
  background-color: white;
  border-radius: 8px;

  & .MuiFilledInput-input {
  }

  .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium {
    font-size: 28px;
  }

  & .MuiInputBase-input {
    min-height: 100%;
    padding-bottom: 1.4rem;
    color: ${WebsiteColors.CARD_BORDER};
  }

  & .MuiInputBase-root.MuiFilledInput-root.Mui-error {
    border-color: transparent;
    box-shadow: white 0 0 0 0 !important;

    @media (max-width: 768px) {
      border-radius: 0px;
      border-bottom-left-radius: 8px;
    }
  }

  & .MuiInputBase-input.MuiFilledInput-input {
    color: ${WebsiteColors.CARD_BORDER} !important;
    font-size: ${({ fontSize }) => (!fontSize ? "14.5px" : "18px")}!important;
  }

  & .MuiInputBase-root.MuiFilledInput-root.Mui-focused {
    border-color: transparent;
    box-shadow: white 0 0 0 0;
  }

  & .MuiInputBase-input .MuiFilledInput-input .MuiInputBase-inputAdornedEnd {
    border: none;
    :focus {
      border-color: white;
    }
  }

  & .MuiInputBase-root {
    height: 100%;
    cursor: pointer;
    font-family: Sora, sans-serif;
  }

  & .MuiInputBase-root:hover {
    opacity: 1;
    background-color: white;
  }

  & .css-1u3bzj6-MuiFormControl-root-MuiTextField-root:focus {
    border: 1px solid ${WebsiteColors.BLACK_PRIMARY};
  }

  @media (max-width: 768px) {
    font-size: 14px !important;
  }
`;

const FormWrapper = styled.form`
  padding: 26px 33px;
  max-width: 1120px;
  border-radius: 12px;
  min-height: 116px;
  background: #bebebe;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  z-index: 10;
  place-content: center;

  @media (max-width: 768px) {
    padding: 16px;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7px;
    width: 100%;
    display: grid;

    .from {
      border-radius: 8px 8px 0px 0px;
    }

    .gridContainer {
      grid-column: 1 / span 2;
    }

    .to {
      border-radius: 0px 0px 0px 0px;
    }

    .date {
    }

    .person {
      border-radius: 0px;
      border-bottom-right-radius: 8px;
    }

    .personContainer {
      position: relative;
    }
  }
`;

const OrderFormTitle = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: white;
  font-family: Sora, sans-serif;

  :first-child {
    font-weight: 400;
    font-size: 32px;
    line-height: 32px;
  }

  :nth-child(2) {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    :first-child {
      font-size: 20px;
      line-height: 32px;
    }

    :nth-child(2) {
      font-size: 16px;
      line-height: 16px;
    }
  }
`;

const TransparentDiv = styled.div`
  height: ${({ ishomepage }) => (ishomepage ? "562px" : "440px")};
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(28, 28, 28, 0.4);

  @media (max-width: 768px) {
    height: 413px;
  }
`;

const OrderFormContainer = styled.div`
  height: ${({ ishomepage }) => (ishomepage ? "562px" : "440px")};
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("/assets/website/home-page-intro.jpg");
  background-color: #bebebe;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    height: 413px;
    margin-top: 0rem;
  }
`;

const OrderFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 120px;
  margin-top: 6.5rem;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 64px;
    margin-top: 3rem;
  }
`;
