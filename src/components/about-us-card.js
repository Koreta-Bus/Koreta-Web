import { Icon } from "shared/IconGenerator";

import { styled } from "styled-components";

import { WebsiteColors } from "theme/colors";

export const AboutusCard = ({ cardInfos, height, mobileHeight }) => {
  return (
    <AboutusCardContainer>
      {cardInfos?.map(({ infoTitle, detailTitles }) => (
        <AboutusCardWrapper height={height} mobileHeight={mobileHeight}>
          <AboutUsCardTitle>{infoTitle}</AboutUsCardTitle>
          <AboutUsInfoWrapper>
            {detailTitles?.map(({ key, text }) => (
              <AboutUsInfoTitle {...{ key }} e>
                <MiddleIcon>
                  <Icon name="middle_dot" />
                </MiddleIcon>
                <p>{text}</p>
              </AboutUsInfoTitle>
            ))}
          </AboutUsInfoWrapper>
        </AboutusCardWrapper>
      ))}
    </AboutusCardContainer>
  );
};

export const MiddleIcon = styled.span`
  position: relative;
  top: -.2rem;
`

const AboutUsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 8px;
`;

const AboutusCardContainer = styled.div`
  font-family: Sora, sans-serif;
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const AboutUsInfoTitle = styled.div`
  display: flex;
  gap: 8px;
  font-size: 16px;
  color: ${WebsiteColors.BLACK_PRIMARY};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AboutUsCardTitle = styled.div`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-family: Sora, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 16px;
`;

const AboutusCardWrapper = styled.div`
  padding: 24px;
  border: 1px solid #d2d6e0;
  background: #f2f2f2;
  border-radius: 4px;
  height: ${({ height }) => height ?? "232px"};

  @media (max-width: 768px) {
    height: ${({ mobileHeight }) => mobileHeight ?? "212px"};
  }
`;
