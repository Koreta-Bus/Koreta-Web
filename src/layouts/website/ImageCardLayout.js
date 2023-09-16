import { WebsiteColors } from "theme/colors";

import styled from "styled-components";

export const ImageCardLayout = ({ children, title, subTitle }) => {
  return (
    <CardContainer>
      <CardWrapper>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <ImageContainer>{children}</ImageContainer>
      </CardWrapper>
    </CardContainer>
  );
};

const ImageContainer = styled.div`
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-family: Sora, sans-serif;
  font-size: 16px;
  line-height: 24px;
`;

const Title = styled.span`
  color: ${WebsiteColors.PRIMARY};
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  font-family: Lora, sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }

`;

const CardContainer = styled.div`
  padding: 24px 40px 40px 40px;
  width: 100%;
  height: auto;
  background-color: ${WebsiteColors.IMAGE_BG_COLOR};
  border-radius: 16px;

  @media (max-width: 768px) {
    min-height: 296px;
    flex-shrink: 0;
    padding: 12px 20px 20px 20px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;
