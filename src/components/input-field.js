import { Icon } from "shared/IconGenerator";
import { WebsiteColors } from "theme/colors";

import styled from "styled-components";
import { IconButton } from "@mui/material";
import { useState } from "react";

export const InputField = ({
  icon,
  iconClick,
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
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    console.log('I am inside the handleInputChange')
    if (+inputText < 100) {
      formik.handleChange(event, inputText);
    }
  };
  console.log(name,'name')

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
          autoComplete="off"
        />
        {icon && (
          <IconWrapper onClick={iconClick}>
            <IconButton>
              <Icon name={icon} width={iconWidth} height={iconHeight} style={iconStyle} />
            </IconButton>
          </IconWrapper>
        )}
      </InputWrapper>
      {Array.isArray(result) &&
        (!result ? (
          <ResultOptionsWrapper>
            <ResultOption>Звідки</ResultOption>
            <ResultOption>Звідки</ResultOption>
            <ResultOption>Звідки</ResultOption>
            <ResultOption>Звідки</ResultOption>
            <ResultOption>Звідки</ResultOption>
          </ResultOptionsWrapper>
        ) : (
          <ResultOptionsWrapper>
            <ResultOption>no result found</ResultOption>
          </ResultOptionsWrapper>
        ))}
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

  :hover {
    background: ${WebsiteColors.HOVER_INPUT};
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
  border-radius: 8px;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  :focus {
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
  color: ${WebsiteColors.BLACK_PRIMARY};
  padding-left: 24px;
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
    font-size:20px;
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
