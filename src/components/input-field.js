import { Icon } from "shared/IconGenerator";
import { WebsiteColors } from "theme/colors";
import { IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { exchangeValues, setOrderFormValue } from "store/states";

import styled from "styled-components";

/*
  Камʹянець-Подільський
  Дунаївці
*/

export const InputField = ({
  id,
  key,
  icon,
  name,
  value,
  onBlur,
  formik,
  result,
  onFocus,
  onChange,
  iconWidth,
  isLoading,
  iconHeight,
  placeholder,
  type = "text",
  iconStyle = null,
  className = null,
  maxLength = null,
  borderRed = false,
  containerClass = null,
}) => {
  const dispatch = useDispatch();

  const [optionModalVisibility, setOptionModalVisibility] = useState(true);

  const handleInputChange = useCallback(
    (event) => {
      const inputText = event.target.value;
      if (+inputText < 100) {
        formik.handleChange(event, inputText);
      }
    },
    [formik]
  );

  const selectPlaceHandler = useCallback(
    (val, cityId) => {
      setOptionModalVisibility(false);
      formik.setFieldValue(name, val);
      dispatch(setOrderFormValue({ name, cityId, cityName: val }));
    },
    [name, formik]
  );

  const exchangeHandler = useCallback(() => {
    if (formik.values.to || formik.values.from) {
      formik.setFieldValue("from", formik.values.to);
      formik.setFieldValue("to", formik.values.from);
      dispatch(exchangeValues());
    }
  }, [formik]);

  useEffect(() => {
    if (result?.length > 0 && !optionModalVisibility) {
      setOptionModalVisibility(true);
    }
  }, [result]);

  return (
    <InputContainer className={containerClass} borderRed={borderRed} key={key}>
      <InputWrapper className={className}>
        <Input
          {...{
            id,
            type,
            name,
            value,
            onBlur,
            onFocus,
            maxLength,
            placeholder,
            onChange: name === "personCount" ? (e) => handleInputChange(e) : onChange,
          }}
          icon={!icon}
          autoComplete="off"
        />
        {icon && (
          <IconWrapper onClick={icon === "exchange" ? exchangeHandler : null}>
            <IconButton>
              <Icon name={icon} width={iconWidth} height={iconHeight} style={iconStyle} />
            </IconButton>
          </IconWrapper>
        )}
      </InputWrapper>
      {isLoading && value ? (
        <ResultOptionsWrapper>
          <ResultOption noResult={true}>loading...</ResultOption>
        </ResultOptionsWrapper>
      ) : (
        Array.isArray(result) &&
        optionModalVisibility &&
        result?.length > 0 &&
        value && (
          <ResultOptionsContainer>
            <ResultOptionsWrapper>
              {result?.map(({ name: cityName, city_id }) => {
                return (
                  <ResultOption
                    onClick={() => selectPlaceHandler(cityName, city_id)}
                  >
                    {cityName?.length > 11 && window.innerWidth > 780
                      ? `${cityName.substring(0, 11)}..`
                      : cityName}
                  </ResultOption>
                );
              })}
            </ResultOptionsWrapper>
          </ResultOptionsContainer>
        )
      )}
      {Array.isArray(result) && result?.length === 0 && value && (
        <ResultOptionsWrapper>
          <ResultOption noResult={true}>не знайдено</ResultOption>
        </ResultOptionsWrapper>
      )}
    </InputContainer>
  );
};

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
`;

const ResultOption = styled.div`
  padding: 20px 24px 20px 0;
  border: 0.5px solid ${WebsiteColors.CARD_BORDER};
  color: ${WebsiteColors.BLACK_PRIMARY};
  max-width: 198px;
  height: 64px;
  background: #ffff;
  border-radius: 4px;
  padding: 20px 24px 0;
  font-size: 20px;
  line-height: 24px;
  margin-top: ${({ noResult }) => (noResult ? "2rem" : "")};

  &:hover {
    border: 1px solid ${WebsiteColors.BLACK_PRIMARY};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

const ResultOptionsContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`;

const ResultOptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5px;
  position: absolute;
  top: 35px;
  z-index: 200;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
    left: 0;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${({ borderRed }) => (borderRed ? "red" : "white")};
  border-radius: 8px;

  :focus,
  :focus-visible,
  :focus-within {
    outline: none;
  }
  @media (max-width: 768px) {
    border: 0px solid transparent;
    border-radius: 0px;
  }
`;

const Input = styled.input`
  font-size: 20px;
  border: 1px solid white;
  outline: none;
  position: relative;
  height: 64px;
  border-radius: 6px;
  padding-left: 24px;
  padding-right: ${({ icon }) => icon && "24px"};
  width: 100%;
  font-family: Sora, sans-serif;
  color: ${WebsiteColors.BLACK_PRIMARY};

  :focus,
  :focus-visible,
  :focus-within {
    outline: none;
    border: 1px solid white;
  }

  &::placeholder {
    color: #6a7682;
    font-size: 20px;
    position: relative;
    top: 0.12rem;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  width: 100%;
  height: 64px;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 64px;
  }

  :focus {
    outline: none;
  }
`;
