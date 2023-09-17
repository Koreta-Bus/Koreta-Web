import { useFormik } from "formik";
import { WebsiteColors } from "theme/colors";
import { Button } from "./button";
import { getDatabase, ref, set } from "firebase/database";
import { Popup } from "shared/alerts";
import { app } from "config/firebase";
import { createdAt } from "shared/date";

import * as Yup from "yup";

import styled from "styled-components";

const initialValues = {
  name: "",
  mobileNumber: "",
  nameOfLegalEntity: "",
  email: "",
  description: "",
};

export const DriverForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Поле \"Ім'я\" обов'язкове"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]+$/, "Номер має містити тільки цифри")
        .min(10, "Номер повинен містити щонайменше 10 цифр")
        .required('Поле "Номер телефону" обов\'язкове'),
      nameOfLegalEntity: Yup.string().required('Поле "Назва юридичної особи" обов\'язкове'),
      email: Yup.string()
        .email("Введіть коректну електронну адресу")
        .max(255, "Електронна адреса має бути менше 255 символів")
        .required('Поле "Email" обов\'язкове'),
      description: Yup.string()
        .max(255, "Опис має бути менше 255 символів")
        .required('Поле "Опис" обов\'язкове'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const db = getDatabase(app);
        const reference = ref(db, "drivers/" + values.mobileNumber);

        set(reference, {
          name: values?.name,
          email: values?.email,
          description: values?.description,
          mobileNumber: values?.mobileNumber,
          nameOfLegalEntity: values?.nameOfLegalEntity,
          createdAt: createdAt(),
        });

        Popup({
          icon: "success",
          title: "Форма запроса водителя",
          text: "Вы успешно отправили свою форму.",
          timer: 2500,
          showConfirmButton: false,
        });
        formik.setValues(initialValues);
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
    <DriverFormContainer>
      <FormTitle>Напишіть нам</FormTitle>
      <StyledDriverForm onSubmit={formik.handleSubmit}> 
        <DriverFormWrapper>
          <FieldWrapper>
            <label htmlFor="name">
              Ім'я та прізвише <Icon name="star" />
            </label>
            <InputTextField
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <ErrorText>{formik.values.name && formik.touched.name && formik.errors.name}</ErrorText>
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
            <ErrorText>
              {formik.values.mobileNumber &&
                formik.touched.mobileNumber &&
                formik.errors.mobileNumber}
            </ErrorText>
          </FieldWrapper>
          <FieldWrapper>
            <label htmlFor="nameOfLegalEntity">Назва юр.особи (якщо наявна)</label>
            <InputTextField
              type="text"
              id="nameOfLegalEntity"
              name="nameOfLegalEntity"
              value={formik.values.nameOfLegalEntity}
              onChange={formik.handleChange}
            />
            <ErrorText>
              {formik.values.nameOfLegalEntity &&
                formik.touched.nameOfLegalEntity &&
                formik.errors.nameOfLegalEntity}
            </ErrorText>
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
            <ErrorText>
              {formik.values.email && formik.touched.email && formik.errors.email}
            </ErrorText>
          </FieldWrapper>
          <FieldWrapper textarea={true}>
            <label htmlFor="description">
              Додаткові відомості, напр. досвід роботи, об'єм поточних продажів та ін.
            </label>
            <TextareaField
              rows={4}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <ErrorText>
              {formik.values.description && formik.touched.description && formik.errors.description}
            </ErrorText>
          </FieldWrapper>
        </DriverFormWrapper>
        <ButtonWrapper>
          <Button padding="10px 0px" type="submit" text={"Надіслати"} />
        </ButtonWrapper>
      </StyledDriverForm>
    </DriverFormContainer>
  );
};

const TextareaField = styled.textarea`
  padding: 1rem;
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

const ButtonWrapper = styled.div`
  width: 200px;
  position: absolute;
  right: 0;
  bottom: 0;
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
  padding: 48px 48px 24px 48px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 28px;
    margin-top: 32px;
  }
`;
