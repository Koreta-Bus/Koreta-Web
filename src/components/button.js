import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { WebsiteColors } from "theme/colors";

export const Button = ({
  func,
  text,
  className,
  type = "submit",
  loading = false,
  disabled = false,
  padding = "16px 0px",
}) => {
  return (
    <StyledButton
      type={type}
      onClick={func}
      className={className}
      padding={padding}
      disabled={disabled}
    >
      {!!loading ? (
        <SpinnerContainer>
          <Text>
            <CircularProgress />
            {text}
          </Text>
        </SpinnerContainer>
      ) : (
        text
      )}
    </StyledButton>
  );
};

const Text = styled.span`
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 18px;

  & .MuiCircularProgress-root {
    color: white;
    width: 25px !important;
    height: 25px !important;
    z-index: 10;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: ${WebsiteColors.BUTTON_BG};
  padding: ${({ padding }) => padding};
  border-radius: 8px;
  color: white;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "24px")};
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${WebsiteColors.BUTTON_BG};

  &:hover {
    opacity: 0.92;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    padding: 8px 8px;
  }
`;
