import { Grid } from "@mui/material";
import { FlexAllCenter } from "./styled.global";
import { WebsiteColors } from "theme/colors";

import styled from "styled-components";

const CARD_INFOS = [
  {
    key: "orderCount",
    title: "100+",
    subTitle: "Напрямки!",
  },
  {
    key: "Відмінно",
    title: "Відмінно",
    subTitle: "обслуговування",
  },
  {
    key: "Підтримка",
    title: "Підтримка",
    subTitle: "В будь-який час",
  },
  {
    key: "25.000",
    title: "25.000",
    subTitle: "Mандрівники",
  },
];

export const InfoCard = () => {
  return (
    <GridSectionWrapper>
      <StyledGridContainer container spacing={2} style={{ marginTop: "2rem" }}>
        {CARD_INFOS.map(({ title, subTitle, key }) => (
          <StyledGrid item xs={6} md={3} key={key}>
            <CardContainer>
              <CardWrapper>
                <Title>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
              </CardWrapper>
            </CardContainer>
          </StyledGrid>
        ))}
      </StyledGridContainer>
    </GridSectionWrapper>
  );
};

const GridSectionWrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: 9.5rem;
  }
`;

const StyledGrid = styled(Grid)`
  .MuiGrid-root.MuiGrid-container {
    padding-left: 0px;
  }
`;

const StyledGridContainer = styled(Grid)`
  width: 100%;
  margin: 0 auto;

  .MuiGrid-root.MuiGrid-item {
    padding-left: 0px;
  }
`;

const Title = styled.span`
  color: ${WebsiteColors.PRIMARY};
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.span`
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardContainer = styled(FlexAllCenter)`
  display: flex;
  margin: 0 auto;
  max-width: 256px;
  width: 100%;
  min-height: 160px;
  border: 1px solid ${WebsiteColors.CARD_BORDER};
  border-radius: 1rem;

  @media (max-width: 768px) {
    max-width: 170px;
    min-height: 119px;
  }
`;

const CardWrapper = styled(FlexAllCenter)`
  display: flex;
  flex-direction: column;
`;
