import { Accordion, Typography } from "@mui/material";
import { WebsiteColors } from "theme/colors";

import styled from 'styled-components'

export const StyledTitleTypography = styled(Typography)`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StyledBodyTypography = styled(Typography)`
  color: #7c8791;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const AccordionSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  .MuiPaper-root.MuiAccordion-root:before {
    background-color: transparent;
  }

  .MuiAccordionSummary-root {
    border-radius: 8px;
    min-height: 56px;
    color: ${WebsiteColors.BLACK_PRIMARY};
  }
`;

export const StyledAccordion = styled(Accordion)`
  border-radius: 8px;
  border: 1px solid ${WebsiteColors.BLACK_PRIMARY};
`;

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
