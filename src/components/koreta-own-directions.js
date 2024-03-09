import { useRouter } from "next/router";

import { styled } from "styled-components";

import { Button } from "./button";

import { WebsiteColors } from "theme/colors";

export const KoretaOwnDirections = () => {
  const router = useRouter();

  return (
    <InfoDirectionsContainer flexColumn>
      <span>Не знайшли точного напрямку? Ви можете приїхати на нашому мікроавтобусі - Корета</span>
      <div style={{ width: "max-content", margin: "0 auto", padding: "0 1rem" }}>
        <Button
          fontSize="12px"
          padding="6px 16px"
          text={"Надішліть нам інформацію"}
          func={() => router.push("/ticket-search/demanded-direction")}
        />
      </div>
    </InfoDirectionsContainer>
  );
};

export const InfoDirectionsContainer = styled.div`
  border: 1px solid ${WebsiteColors.PRIMARY};
  border-radius: 8px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: ${({ flexColumn }) => (flexColumn ? "column" : "row")};
  gap: ${({ flexColumn }) => flexColumn && "1rem"};
  text-align: center;
  justify-content: center;
  align-items: center;

  & span {
    font-family: Sora, sans-serif;
    font-size: 28px !important;
    line-height: 28px !important;
  }

  @media (max-width: 768px) {
    padding: 10px;
    margin-top: 8rem;

    span {
      font-family: Sora, sans-serif;
      font-size: 18px !important;
      line-height: 18px !important;
    }
  }
`;
