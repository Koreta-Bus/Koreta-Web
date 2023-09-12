import { useFormik } from "formik";
import styled from "styled-components";
import { WebsiteColors } from "theme/colors";
import { Button } from "./button";

import * as Yup from "yup";

export const DriverForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNumber: "",
      nameOfLegalEntity: "",
      email: "",
      description: "",
    },
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
      //   try {
      //     await auth.signIn(values.email, values.password);
      //     router.push("/admin");
      //   } catch (err) {
      //     helpers.setStatus({ success: false });
      //     helpers.setErrors({ submit: err.message });
      //     helpers.setSubmitting(false);
      //   }
    },
  });
  return (
    <DriverFormContainer>
      <FormTitle>Напишіть нам</FormTitle>
      <StyledDriverForm onSubmit={() => {}}>
        <DriverFormWrapper>
          <FieldWrapper>
            <label for="name">Ім'я та прізвише</label>
            <input type="text" id="name" name="name" />
          </FieldWrapper>
          <FieldWrapper>
            <label for="mobileNumber">Номер телефону</label>
            <input type="text" id="mobileNumber" name="mobileNumber" />
          </FieldWrapper>
          <FieldWrapper>
            <label for="nameOfLegalEntity">Назва юр.особи (якщо наявна)</label>
            <input type="text" id="nameOfLegalEntity" name="nameOfLegalEntity" />
          </FieldWrapper>
          <FieldWrapper>
            <label for="email">Email, веб-сайт (якщо наявні)</label>
            <input type="text" id="email" name="email" />
          </FieldWrapper>
          <FieldWrapper textarea={true}>
            <label for="description">
              Додаткові відомості, напр. досвід роботи, об'єм поточних продажів та ін.
            </label>
            <textarea rows={4} id="description" name="description" />
          </FieldWrapper>
        </DriverFormWrapper>
        <ButtonWrapper>
          <Button padding="12px 0px" type="submit" text={"Надіслати"} />
        </ButtonWrapper>
      </StyledDriverForm>
    </DriverFormContainer>
  );
};

const ButtonWrapper = styled.div`
  width: 232px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  grid-column: ${({ textarea }) => {
    return textarea ? "1 / span 2" : "";
  }};
`;

const DriverFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

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
