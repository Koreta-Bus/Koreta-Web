import { WebsiteColors } from "theme/colors";
import { FlexAllCenter } from "./styled.global";
import { Icon } from "shared/IconGenerator";
import Image from "next/image";

import { WebsitePageLayouts } from "layouts/website";

import styled from "styled-components";

const mobileAddImages = [
  {
    id: "playStore",
    src: "/assets/website/google-play.jpg",
    alt: "Koreta Bus Ticket Order - Play Store",
  },
  {
    id: "appleStore",
    src: "/assets/website/apple-store.jpg",
    alt: "Koreta Bus Ticket Order - Apple Store",
  },
];

const FooterMenuLists = [
  {
    title: "Інформація",
    lists: [
      {
        key: "Питання",
        title: "Питання та Відповіді",
      },
      {
        key: "FAQ",
        title: "FAQ",
      },
    ],
  },
  {
    title: "Співпраця",
    lists: [
      {
        key: "Для",
        title: "Для перевізників",
      },
      {
        key: "Про нас",
        title: "Про нас",
      },
    ],
  },
  {
    title: "Контакти",
    lists: [
      {
        key: "Зворотний",
        title: "Зворотний звязок",
      },
      {
        key: "+38",
        title: "+38 xxx xxx xxx",
        icon: "phone",
      },
    ],
  },
  {
    title: "Ми у соц. мережах",
    lists: [
      {
        key: "Instagram",
        title: "Instagram",
        icon: "instagram",
      },
      {
        key: "Facebook",
        title: "Facebook",
        icon: "facebook",
      },
      {
        key: "Telegram",
        title: "Telegram",
        icon: "telegram",
      },
    ],
  },
];

export const MainFooter = () => {
  return (
    <Footer>
      <WebsitePageLayouts>
        <FooterTopContainer>
          <MenuListsContainer>
            {FooterMenuLists?.map(({ title, lists }) => (
              <MenuListWrapper key={title}>
                <FooterListTitle>{title}</FooterListTitle>
                <FooterUnorderList>
                  {lists?.map(({ key, title, icon }) => (
                    <ListContainer key={key}>
                      {icon && <Icon name={icon} />}
                      <MenuList>{title}</MenuList>
                    </ListContainer>
                  ))}
                </FooterUnorderList>
              </MenuListWrapper>
            ))}
          </MenuListsContainer>
          <FooterMobileAddImages>
            {mobileAddImages?.map(({ id, ...rest }) => (
              <StyledImage {...rest} key={id} width={0} height={0} sizes="100vw" quality={100} />
            ))}
          </FooterMobileAddImages>
        </FooterTopContainer>
        <CopyRightContainer>
          <CopyRightTitle>
            <FooterLogoTitle>Koreta</FooterLogoTitle>
            <CopyRightText>Copyright © 2023</CopyRightText>
          </CopyRightTitle>
          <CopyRightDescription>
            Політика конфіденційності та Угода користувача{" "}
          </CopyRightDescription>
        </CopyRightContainer>
      </WebsitePageLayouts>
    </Footer>
  );
};

const ListContainer = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 169px;
  min-height: 50px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 160px;
    min-height: 50px;
  }
`;

const FooterMobileAddImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;

const FooterTopContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 72px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 35px 0;
    gap: 50px;
  }
`;

const MenuListsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MenuList = styled.span`
  display: flex;
  gap: 16px;
`;

const FooterUnorderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    list-style-type: none;
  }
`;

const FooterListTitle = styled.h4`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

const FooterLogoTitle = styled.h3`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 0.4rem;
`;

const CopyRightText = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 16px;
  line-height: 20px;
`;

const CopyRightDescription = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 16px;
  line-height: 25px;

  @media (max-width: 768px) {
    margin: 0 auto;
    font-size: 12px;
    margin-top: 28px;
  }
`;

const CopyRightTitle = styled(FlexAllCenter)`
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const CopyRightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0;
  border-top: 1px solid ${WebsiteColors.BLACK_PRIMARY};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px 0;
  }
`;

const Footer = styled.footer`
  width: 100%;
  border-top: 2px solid ${WebsiteColors.PRIMARY};
  font-family: Sora, sans-serif;
`;
