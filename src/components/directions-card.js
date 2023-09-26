import styled from "styled-components";
import { WebsiteColors } from "theme/colors";
import { Button } from "./button";
import { Icon } from "shared/IconGenerator";
import { useTrail, animated } from "react-spring";
import { OrderForm } from "sections/home/order-form";
import { MainFooter } from "./website-footer";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetSearchBusDirectionsQuery } from "store/apis";

export const DirectionsCard = () => {
  const { seachFormValues } = useSelector((state) => state.searchBusDirections);

  const [
    getSearchBusDirections,
    { data: busDirections, isSuccess, error, isLoading: busDirectionsLoading },
  ] = useLazyGetSearchBusDirectionsQuery();

  const trail = useTrail(busDirections?.body?.length ?? 0, {
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    config: { mass: 1, tension: 500, friction: 35 },
    delay: 400,
  });

  return (
    <>
      <OrderForm
        searchedInitialValues={seachFormValues}
        getSearchBusDirections={getSearchBusDirections}
        busDirectionsLoading={busDirectionsLoading}
      />
      <Container>
        <h2>Графік відправлення</h2>
        {trail?.map((style, index) => {
          const direction = busDirections?.body?.[index];
          console.log(style,'style')
          return (
            <animated.div style={style} key={index}>
              <DirectionsCardContainer>
                <TopContainer isMicroAuto={direction.is_microauto}>
                  {direction.is_microauto && (
                    <LogoContainer>
                      <IconWrapper>
                        <Icon name="micro_autobus" />
                      </IconWrapper>
                    </LogoContainer>
                  )}
                  <TopContent>
                    <TopContent_Title>{direction?.route_name}</TopContent_Title>
                    <Yellow_Content>
                      Обов'язкова попередня оплата вартості одного квитка для груп з трьох і більше
                      осіб
                    </Yellow_Content>
                  </TopContent>
                </TopContainer>
                <BottomContainer>
                  <LeftContent>
                    <BottonContent_Date>{direction?.date_departure}</BottonContent_Date>
                    <LeftContent_SubTitle>{direction?.from_city}</LeftContent_SubTitle>
                    <LeftContent_Street>{direction?.from_station}</LeftContent_Street>
                  </LeftContent>
                  <RightContent>
                    <BottonContent_Date>{direction?.date_arrival}</BottonContent_Date>
                    <BottomContent_Airport>{direction?.to_city}</BottomContent_Airport>
                    <BottomContent_Enter>{direction?.to_station}</BottomContent_Enter>
                  </RightContent>
                </BottomContainer>
                <Button
                  func={() => {}}
                  text={direction?.price}
                  type={"text"}
                  padding={"10px 0px"}
                />
              </DirectionsCardContainer>
            </animated.div>
          );
        })}
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
  align-items: center;
  gap: 40px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin-top: 10rem;
    padding: 1rem;
    gap: 32px;
  }

  h2 {
    color: ${WebsiteColors.PRIMARY};
    font-family: Lora, sans-serif;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;

    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  }
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
  max-width: 500px;
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

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TopContent_SubTItle = styled.span`
  color: #6a7682;
`;

const TopContent_Title = styled.span`
  font-size: 20px;
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-weight: 500;
  line-height: 24px;

  @media (max-width: 768px) {
    max-width: 234px;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
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
  justify-content: ${({ isMicroAuto }) => (isMicroAuto ? "end" : "center")};
  width: 100%;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
`;

const LogoContainer = styled.div`
  order: 1;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    order: -1;
  }
`;

const DirectionsCardContainer = styled.div`
  width: 1120px;
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
