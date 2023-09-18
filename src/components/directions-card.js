import styled from "styled-components";
import { WebsiteColors } from "theme/colors";
import { Button } from "./button";
import { Icon } from "shared/IconGenerator";
import { useTrail, animated } from "react-spring";
import { OrderForm } from "sections/home/order-form";
import { MainFooter } from "./website-footer";
import { useDispatch, useSelector } from "react-redux";

export const DirectionsCard = () => {
  const { seachFormValues } = useSelector((state) => state.searchBusDirections);

  // const trail = useTrail(moviesList?.length, {
  //   from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
  //   to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  //   config: { mass: 1, tension: 500, friction: 35 },
  //   delay: 300,
  // });

  return (
    <>
      <OrderForm searchedInitialValues={seachFormValues}/>
      <Container>
        <DirectionsCardContainer>
          <TopContainer>
            <LogoContainer>
              <IconWrapper>
                <Icon name="micro_autobus" />
              </IconWrapper>
            </LogoContainer>
            <TopContent>
              <TopContent_Title>
                Київ АС (Зал. вок.)-Познань АВ По рейсу можлива заміна автобуса у місті Львів
              </TopContent_Title>
              <TopContent_SubTItle>Рейс з пересадкою у м. Львів</TopContent_SubTItle>
              <Yellow_Content>
                Обов'язкова попередня оплата вартості одного квитка для груп з трьох і більше осіб
              </Yellow_Content>
            </TopContent>
          </TopContainer>
          <BottomContainer>
            <LeftContent>
              <BottonContent_Date>04.09, 22:30</BottonContent_Date>
              <LeftContent_SubTitle>Київ АС (Зал. вок.),</LeftContent_SubTitle>
              <LeftContent_Street>С.Петлюри вул. 32</LeftContent_Street>
            </LeftContent>
            <RightContent>
              <BottonContent_Date>05.09, 16:20</BottonContent_Date>
              <BottomContent_Airport>
                Аеропорт Фредеріка Шопена "Аеропорт ім. Фредеріка Шопена, 1-й рівень зони приліту
                (вихід з 1 сектору до АВу)",
              </BottomContent_Airport>
              <BottomContent_Enter>
                1-й рівень зони приліту (вихід з 1 сектору до автовокзалу)
              </BottomContent_Enter>
            </RightContent>
          </BottomContainer>
          <Button func={() => {}} text="1200.00 UAH" type={"text"} padding={"16px 0px"} />
        </DirectionsCardContainer>
      </Container>
      <MainFooter />
    </>
  );
};

const Container = styled.section`
  padding: 48px 0;
  max-width: 1120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
`;

const BottomContent_Enter = styled.span`
  color: #7c8791;
  font-weight: 400;
`;

const BottomContent_Airport = styled.span`
  color: #6a7682;
`;

const LeftContent_Street = styled.span`
  color: #7c8791;
`;

const LeftContent_SubTitle = styled.span`
  color: #6a7682;
`;

const BottonContent_Date = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: end;
  max-width: 538px;
  gap: 4px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  max-width: 150px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
`;

const Yellow_Content = styled.span`
  color: #e0a600;
`;

const TopContent_SubTItle = styled.span`
  color: #6a7682;
`;

const TopContent_Title = styled.span`
  font-size: 20px;
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-weight: 500;
  line-height: 24px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 1.5rem;
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
`;

const LogoContainer = styled.div`
  order: 1;
  display: flex;
  justify-content: space-between;
`;

const DirectionsCardContainer = styled.div`
  width: 100%;
  padding: 32px 32px 24px 32px;
  border: 1px solid ${WebsiteColors.PRIMARY};
  border-radius: 8px;
  font-family: Sora, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
