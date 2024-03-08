import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useTrail, animated } from "react-spring";

import { WebsiteColors } from "theme/colors";

import { OrderForm } from "sections/home/order-form";

import { Button } from "./button";
import { MainFooter } from "./website-footer";

import { storeOrderValues } from "store/states";
import { useLazyGetSearchBusDirectionsQuery } from "store/apis";

import { isEmpty } from "shared/common";

import { InfoDirectionsContainer } from "./koreta-own-directions";

export const DirectionsCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { seachFormValues } = useSelector((state) => state.searchBusDirections);

  const [
    getSearchBusDirections,
    { data: busDirections, isSuccess, isError, isLoading: busDirectionsLoading, isUninitialized },
  ] = useLazyGetSearchBusDirectionsQuery();

  const busDirectionsFiltered = useMemo(
    () => busDirections?.body?.filter((data) => !data?.is_microauto),
    [busDirections]
  );

  const trail = useTrail(busDirectionsFiltered?.length ?? 0, {
    delay: 500,
    config: { mass: 1, tension: 800, friction: 85 },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
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
        busDirectionsLoading={busDirectionsLoading}
        getSearchBusDirections={getSearchBusDirections}
      />
      <Container>
        <h2>Графік відправлення</h2>

        <InfoDirectionsContainer flexColumn>
          <span>
            Не знайшли точного напрямку? Ви можете приїхати на нашому мікроавтобусі - Корета
          </span>
          <div style={{ width: "max-content", margin: "0 auto", padding: "0 1rem" }}>
            <Button
              fontSize="12px"
              padding="6px 16px"
              text={"Надішліть нам інформацію"}
              func={() => router.push("/ticket-search/demanded-direction")}
            />
          </div>
        </InfoDirectionsContainer>

        <CardMainContainer>
          {trail?.map((style, index) => {
            const direction = busDirections?.body?.[index];

            return (
              <animated.div style={style} key={index}>
                <DirectionsCardContainer>
                  <TopContainer>
                    <TopContent>
                      <TopContent_Title>{direction?.route_name}</TopContent_Title>
                      <Yellow_Content>{direction?.carrier_name}</Yellow_Content>
                      <SeatsCount>{`Вільне місце: ${
                        direction?.free_seats ?? "доступний"
                      }`}</SeatsCount>
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
                    type={"text"}
                    padding={"6px 0px"}
                    text={direction?.price}
                    func={() => handleToOrderForm(direction)}
                  />
                </DirectionsCardContainer>
              </animated.div>
            );
          })}

          {isEmpty(trail) && isUninitialized && (
            <InfoDirectionsContainer>
              <span>Цей пункт призначення недоступний</span>
            </InfoDirectionsContainer>
          )}
        </CardMainContainer>
      </Container>
      <MainFooter />
    </>
  );
};

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
