import styled from "styled-components";
import { WebsiteColors } from "theme/colors";

export const FlexAllCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 500;
  line-height: 44px;
  color: ${WebsiteColors.PRIMARY};
  font-family: Lora, sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const PageSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 48px 0;

  @media (max-width: 768px) {
    gap: 24px;
    padding-top: 24px;
    padding-bottom: 48px;
  }
`;


export const InfoCardTitle = styled.h2`
  font-family: Sora, sans-serif;
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 768px) {
    padding-top: 16px;
  }
`;

export const InfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 24px;
    margin-top: -32px;
  }
`;