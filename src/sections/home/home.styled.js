import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { WebsiteColors } from 'theme/colors';

import styled from 'styled-components'

// Bus Ticker Order

export const LandingPage = styled.div``;

export const LandingContainer = styled.main`
  margin: 0 auto;
  min-width: 100%;
  padding: 0;
  overflow: hidden;
`;

// Order Form

export const ContactDetail = styled.div`
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

export const StyledOnlyMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledHeaderMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledMobileDatePicker = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const StyledDesktopDatePicker = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CustomDatePicker = styled(({ isMobile, fontSize, ...props }) =>
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

export const FormWrapper = styled.form`
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

export const OrderFormTitle = styled.div`
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

export const TransparentDiv = styled.div`
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

export const OrderFormContainer = styled.div`
  height: ${({ ishomepage }) => (ishomepage ? "562px" : "440px")};
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("/assets/website/home-page-intro.jpg");
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    height: 413px;
    margin-top: 0rem;
  }
`;

export const OrderFormWrapper = styled.div`
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
