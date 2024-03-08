import { Icon } from "shared/IconGenerator";

import styled from "styled-components";

import { WebsiteColors } from "theme/colors";

export const ContactCard = ({ ContactCardInfos }) => {
  return (
    <CardContainer>
      {ContactCardInfos?.map(({ type, id, iconName, title, subTitle }) => (
        <CardWrapper type={type} key={id}>
          <ContactLogoWrapper>
            <Icon name={iconName} />
          </ContactLogoWrapper>
          <ContactCardInfo>
            <span>{title}</span>
            <span>{subTitle}</span>
          </ContactCardInfo>
        </CardWrapper>
      ))}
    </CardContainer>
  );
};

const ContactCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-family: Sora, sans-serif;

  :first-child {
    color: ${WebsiteColors.BLACK_PRIMARY};
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  }
  :nth-child(2) {
    color: #6a7682;
    font-size: 16px;
    line-height: 24px;
  }
`;

const ContactLogoWrapper = styled.span``;

const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  padding: 24px 27px 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  box-shadow: 0px 0px 16px 0px rgba(32, 48, 99, 0.2);
  border-radius: ${({ type }) => {
    switch (type) {
      case "location":
        return "0px 48px 48px 48px";
      case "operator":
        return "48px";
      case "message":
        return "48px 0px 48px 48px";
      default:
        return "48px";
    }
  }};

  @media (max-width: 768px) {
    padding: 24px 0px 32px 0px;
    box-shadow: 0px 0px 12px 0px rgba(32, 48, 99, 0.2);
  }
`;
