import { Icon } from "shared/IconGenerator";
import { WebsiteColors } from "theme/colors";
import { IconButton } from "@mui/material";

import styled from "styled-components";
import { useCallback, useState } from "react";

export const InputField = ({
  icon,
  value,
  onChange,
  onBlur,
  onFocus,
  result,
  id,
  name,
  type = "text",
  placeholder,
  iconWidth,
  iconHeight,
  iconStyle = null,
  className = null,
  containerClass = null,
  maxLength = null,
  formik,
}) => {
  const [optionModalVisibility, setOptionModalVisibility] = useState(true);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    if (+inputText < 100) {
      formik.handleChange(event, inputText);
    }
  };

  const selectPlaceHandler = () => {
    setOptionModalVisibility(false);
  };

  const exchangeHandler = useCallback(() => {
    formik.setFieldValue("from", formik.values.to);
    formik.setFieldValue("to", formik.values.from);
  }, [formik]);

  return (
    <InputContainer className={containerClass}>
      <InputWrapper className={className}>
        <Input
          {...{
            value,
            onBlur,
            onFocus,
            type,
            id,
            name,
            placeholder,
            onChange: name === "personCount" ? (e) => handleInputChange(e) : onChange,
            maxLength,
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
      {Array.isArray(result) && optionModalVisibility && result?.length > 0 && (
        <ResultOptionsWrapper>
          <ResultOption onClick={() => selectPlaceHandler()}>Звідки</ResultOption>
          <ResultOption>Звідки</ResultOption>
          <ResultOption>Звідки</ResultOption>
          <ResultOption>Звідки</ResultOption>
          <ResultOption>Звідки</ResultOption>
        </ResultOptionsWrapper>
      )}
      {result?.length === 0 && (
        <ResultOptionsWrapper>
          <ResultOption>no result found</ResultOption>
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
  color: ${WebsiteColors.CARD_BORDER};
  max-width: 198px;
  height: 64px;
  background: #ffff;
  border-radius: 4px;
  color: ${WebsiteColors.CARD_BORDER};
  padding: 20px 24px 0;
  font-size: 20px;
  line-height: 24px;

  &:hover {
    border: 1px solid ${WebsiteColors.BLACK_PRIMARY};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

const ResultOptionsWrapper = styled.div`
  width: 198px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5px;
  position: absolute;
  top: 70px;
  z-index: 200;
  overflow: scroll;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
    max-height: 150px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  :focus,
  :focus-visible,
  :focus-within {
    outline: none;
  }
`;

const Input = styled.input`
  font-size: 20px;
  border: 1px solid white;
  outline: none;
  position: relative;
  height: 64px;
  border-radius: 8px;
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
    font-size: 14px;
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
