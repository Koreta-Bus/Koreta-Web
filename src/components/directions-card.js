import styled from "styled-components";
import { WebsiteColors } from "theme/colors";
import { Button } from "./button";
import { Icon } from "shared/IconGenerator";
import { useTrail, animated } from "react-spring";
import { OrderForm } from "sections/home/order-form";
import { MainFooter } from "./website-footer";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetSearchBusDirectionsQuery } from "store/apis";
import { useEffect } from "react";
import { storeOrderValues } from "store/states";
import { useRouter } from "next/router";

export const DirectionsCard = () => {
  const { seachFormValues } = useSelector((state) => state.searchBusDirections);

  const dispatch = useDispatch();
  const router = useRouter();

  const [
    getSearchBusDirections,
    { data: busDirections, isSuccess, isError, isLoading: busDirectionsLoading },
  ] = useLazyGetSearchBusDirectionsQuery();

  const trail = useTrail(busDirections?.body?.length ?? 0, {
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    config: { mass: 1, tension: 800, friction: 85 },
    delay: 500,
  });

  const handleToOrderForm = (direction) => {
    router.push("/ticket-search/order");
    dispatch(storeOrderValues(direction));
  };

  useEffect(() => {
    if (isSuccess || isError || busDirections) {
      setTimeout(() => {
        window.scrollTo({
          top: 350,
          behavior: "smooth",
        });
      }, 2000);
    }
  }, [isSuccess, isError, busDirections]);

  return (
    <>
      <OrderForm
        searchedInitialValues={seachFormValues}
        getSearchBusDirections={getSearchBusDirections}
        busDirectionsLoading={busDirectionsLoading}
      />
      <Container>
        <h2>Графік відправлення</h2>
        {busDirections?.body?.length === 0 ? (
          <NotFounDirectionContainer>
            <span>Цей пункт призначення недоступний</span>
          </NotFounDirectionContainer>
        ) : null}
        <CardMainContainer>
          {trail?.map((style, index) => {
            const direction = busDirections?.body?.[index];
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
                      <Yellow_Content>{direction?.carrier_name}</Yellow_Content>
                      <SeatsCount>{`Вільне місце: ${direction?.free_seats}`}</SeatsCount>
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
                    func={() => direction?.is_microauto && handleToOrderForm(direction)}
                    text={direction?.is_microauto ? direction?.price : 'Не доступно для замовлення'}
                    type={"text"}
                    padding={"10px 0px"}
                    disabled={!direction?.is_microauto}
                  />
                </DirectionsCardContainer>
              </animated.div>
            );
          })}
        </CardMainContainer>
      </Container>
      <MainFooter />
    </>
  );
};

const NotFounDirectionContainer = styled.div`
  border: 2px solid ${WebsiteColors.PRIMARY};
  border-radius: 8px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    font-family: Sora, sans-serif;
    font-size: 28px !important;
    line-height: 28px !important;
  }

  @media (max-width: 768px) {
    padding: 10px;

    span {
      font-family: Sora, sans-serif;
      font-size: 18px !important;
      line-height: 18px !important;
    }
  }
`;

const SeatsCount = styled.div``;

const Container = styled.section`
  padding: 48px 0;
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin-top: 10rem;
    gap: 32px;
    max-width: 345px;
    width: 100%;
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

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }
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

const CardMainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const DirectionsCardContainer = styled.div`
  width: 1000px;
  padding: 32px 32px 24px 32px;
  border: 1px solid ${WebsiteColors.PRIMARY};
  border-radius: 8px;
  font-family: Sora, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    gap: 20px;
  }
`;
