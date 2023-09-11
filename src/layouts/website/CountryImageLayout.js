import { WebsiteColors } from "theme/colors";
import { FlexColumn } from "components/styled.global";

import styled from "styled-components";

export const CountryImageLayout = ({ children, title, subTitle }) => {
  return (
    <CardContainer>
      <CardWrapper>
        <ImageContainer>{children}</ImageContainer>
        <TitleContainers>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </TitleContainers>
      </CardWrapper>
    </CardContainer>
  );
};

const ImageContainer = styled.div`
  border-radius: 16px;
`;

const TitleContainers = styled(FlexColumn)`
  gap: 8px;
  align-items: center;
  text-align: center;
`;

const SubTitle = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 16px;
  line-height: 24px;
`;

const Title = styled.span`
  color: ${WebsiteColors.PRIMARY};
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CardContainer = styled.div`
  padding: 24px;
  width: 100%;
  height: auto;
  background-color: ${WebsiteColors.IMAGE_BG_COLOR};
  border-radius: 16px;
  min-height: 440px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const CardWrapper = styled(FlexColumn)`
  gap: 16px;
`;
