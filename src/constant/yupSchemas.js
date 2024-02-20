import * as Yup from "yup";

export const orderFormValidSchema = () =>
  Yup.object({
    from: Yup.string().required('Поле "Звідки" обов\'язкове'),
    to: Yup.string().required('Поле "Куди" обов\'язкове'),
    date: Yup.string().notOneOf(["Дата"], "Виберіть дату").required('Поле "Дата" обов\'язкове'),
    personCount: Yup.number()
      .typeError('Поле "Кількість осіб" повинно бути числовим значенням')
      .integer('Поле "Кількість осіб" повинно бути цілим числом')
      .min(1, 'Поле "Кількість осіб" повинно бути більше або дорівнювати 1')
      .required('Поле "Кількість осіб" обов\'язкове'),
  });

export const driverFormValidSchema = () =>
  Yup.object({
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
  });

export const orderFormTicketValidSchema = () =>
  Yup.object({
    name: Yup.string().required("Поле \"Ім'я\" обов'язкове"),
    surname: Yup.string().required('Поле "Прізвище'),
    mobileNumber: Yup.string()
      .min(10, "Номер повинен містити щонайменше 10 цифр")
      .required('Поле "Номер телефону" обов\'язкове'),
    email: Yup.string()
      .email("Введіть коректну електронну адресу")
      .max(255, "Електронна адреса має бути менше 255 символів")
      .required('Поле "Email" обов\'язкове'),
    transport_id: Yup.string().required('Поле "Оберіть автомобіль" обов\'язкове'),
    seat: Yup.mixed().required('Поле "Оберіть місце" обов\'язкове')
  });

export const citiesCreateFormValisSchema = () =>
  Yup.object({
    from: Yup.string().required("Поле 'Звідки' обов'язкове"),
    to: Yup.string().required('Поле "Куди" обов\'язкове'),
    price: Yup.string().required('Поле "Ціна" обов\'язкове'),
    uniqueKey: Yup.string()
      .required('Поле "Унікальний ключ" обов\'язкове')
      .matches(/^(?=.*[0-9]).+$/, "Унікальний ключ повинен містити як букви, так і цифри"),
    goesFrom: Yup.string().required('Поле "Звідки" обов\'язкове'),
    goesTo: Yup.string().required('Поле "Куди" обов\'язкове'),
  });

export const loginFormValidSchema = () =>
  Yup.object({
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });
