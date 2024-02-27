import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "shared/IconGenerator";
import { FlexAllCenter } from "./styled.global";
import { WebsiteColors } from "theme/colors";
import { SocialMedia } from "shared/socialMedia";
import styled from "styled-components";
import Image from "next/image";

const ContactDetails = [
  // {
  //   key: "Search",
  //   title: "Пошук квитків",
  //   icon: "search",
  // },
  {
    key: "Phone",
    title: "+380 97 146 1991",
    icon: "phone",
  },
  ...SocialMedia,
];

export const Header = () => {
  const router = useRouter();

  const [openselect, setOpenSelect] = useState(false);
  const [openselectMobile, setOpenSelectMobile] = useState(false);
  const [isHamburgerVisible, setHamburgerVisible] = useState("");

  const handleOpenOptions = useCallback((e) => {
    e.stopPropagation();
    setOpenSelect((prev) => !prev);
  }, []);

  const handleOpenOptionsMobile = useCallback((e) => {
    e.stopPropagation();
    setOpenSelectMobile((prev) => !prev);
  }, []);

  const routerHandler = useCallback((page) => router.push(page), []);

  const mobileRouterHandler = useCallback((page) => {
    setTimeout(() => router.push(page), 240);
    setHamburgerVisible("");
  }, []);

  const handleHamburger = useCallback((val) => setHamburgerVisible(val), []);

  const addClassList = useCallback((className) => {
    const root = document.getElementsByTagName("html")[0];
    root.setAttribute("class", className);
  }, []);

  useEffect(() => {
    if (isHamburgerVisible) addClassList("htmlOverflowHidden");
    else addClassList("htmlOverFlowScroll");
  }, [isHamburgerVisible]);

  return (
    <>
      <HeaderContainer>
        <Logo onClick={() => routerHandler("/")}>Koreta</Logo>
        <Navigation>
          <MenuItem onClick={() => routerHandler("/")}>Головна</MenuItem>
          <MenuItemSelectContainer>
            <MenuItemSelect onClick={handleOpenOptions}>
              <MenuItem>Контакти і Співпраця</MenuItem>
              <IconWrapper dorotate={openselect}>
                <Icon
                  onClick={handleOpenOptions}
                  onBlur={() => setOpenSelect("")}
                  name="down_arrow"
                />
              </IconWrapper>
              <MenuItemOptions openselect={openselect}>
                <MenuItem black="true" onClick={() => routerHandler("/contact")}>
                  Зворотний звязок
                </MenuItem>
                <MenuItem black="true" onClick={() => routerHandler("/for-carriers")}>
                  Для перевізників
                </MenuItem>
                <MenuItem black="true" onClick={() => routerHandler("/about-us")}>
                  Про нас
                </MenuItem>
              </MenuItemOptions>
            </MenuItemSelect>
          </MenuItemSelectContainer>
          <MenuItem onClick={() => routerHandler("/faq")}>FAQ</MenuItem>
        </Navigation>
        <Hamburger onClick={() => handleHamburger(true)}>
          <Icon name="hamburger" />
        </Hamburger>
      </HeaderContainer>
      <MobileHeaderContainer isHamburgerVisible={isHamburgerVisible}>
        <div>
          <MobileHamburgerHeader>
            <Logo black="true">Koreta</Logo>
            <ExitIcon onClick={() => handleHamburger("")}>
              <Icon name="exit" />
            </ExitIcon>
          </MobileHamburgerHeader>
          <ContactDetailsContainer>
            {ContactDetails?.map(({ key, title, icon, path }) => (
              <ContactDetail key={key} href={path} target="_blank">
                  <span>
                    <Icon name={icon} />
                  </span>
                <span>{title}</span>
              </ContactDetail>
            ))}
          </ContactDetailsContainer>
          <HeaderOptionsContainer>
            <MenuItem black onClick={() => mobileRouterHandler("/")}>
              Головна
            </MenuItem>
            <MenuItemSelect onClick={handleOpenOptionsMobile}>
              <MenuItemHeader>
                <MenuItem black="true">Контакти і Співпраця</MenuItem>
                <IconWrapper dorotate={openselectMobile}>
                  <Icon
                    onClick={handleOpenOptions}
                    onBlur={() => setOpenSelect("")}
                    name="down_arrow_balack"
                  />
                </IconWrapper>
              </MenuItemHeader>
              <MenuItemOptions openselect={openselectMobile}>
                <MenuItem black="true" onClick={() => mobileRouterHandler("/contact")}>
                  Зворотний звязок
                </MenuItem>
                <MenuItem black="true" onClick={() => mobileRouterHandler("/for-carriers")}>
                  Для перевізників
                </MenuItem>
                <MenuItem black="true" onClick={() => mobileRouterHandler("/about-us")}>
                  Про нас
                </MenuItem>
              </MenuItemOptions>
            </MenuItemSelect>
            <MenuItem black onClick={() => mobileRouterHandler("/faq")}>
              FAQ
            </MenuItem>
          </HeaderOptionsContainer>
        </div>
      </MobileHeaderContainer>
    </>
  );
};

const MenuItemHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const HeaderOptionsContainer = styled.div`
  @media (max-width: 768px) {
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${WebsiteColors.BLACK_PRIMARY};
  cursor: pointer;
`;

const ContactDetailsContainer = styled.div`
  padding: 32px 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #d2d6e0;
  width: 100%;
`;

const ExitIcon = styled(FlexAllCenter)``;

const MobileHamburgerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #d2d6e0;
`;

const MobileHeaderContainer = styled.div`
  height: 0;
  opacity: 0;
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    background-color: white;
    z-index: 1000;
    margin-bottom: 4rem;
    left: ${({ isHamburgerVisible }) => (!isHamburgerVisible ? "100vw" : "0")};
    opacity: 1;
    transition-duration: 0.33s;
  }
`;

const Hamburger = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuItemOptions = styled.div`
  position: absolute;
  top: 25px;
  right: 2px;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  padding: 16px;
  font-family: Sora, sans-serif;
  display: ${({ openselect }) => (openselect ? "flex" : "none")};
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: relative;
    left: 0px;
    top: 0px;
    width: 100%;
    min-height: 100%;
    padding: 6px 16px;
    gap: 8px;
  }
`;

const IconWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: ${({ dorotate }) => (dorotate ? "rotate(180deg)" : "rotate(0deg)")};
  transition-duration: 0.4s;
`;

const MenuItemSelectContainer = styled.div`
  position: relative;
`;

const MenuItemSelect = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  max-width: 1120px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  z-index: 100;
  margin-top: 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: ${({ black }) => (black ? "black" : "white")};
  font-family: Lora, sans-serif;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  font-family: Sora, sans-serif;
  color: ${({ black }) => {
    return black ? "#1c1c1c" : "#ffff";
  }};

  @media (max-width: 768px) {
    font-weight: 400;
  }
`;
