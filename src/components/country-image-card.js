import React from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { CountryImageLayout } from "layouts/website/CountryImageLayout";
import { WebsiteColors } from "theme/colors";

import styled from "styled-components";

const cardData = [
  {
    title: "Польща",
    subTitle: "Автобусні маршрути з України в усі куточки Польщі.",
    src: "/assets/website/poland.png",
    alt: "Bus Ticket Order - Poland",
  },
  {
    title: "Німеччина",
    subTitle: "Комфортна і відмінна поїздка практично в будь-яке місто Німеччини!",
    src: "/assets/website/germany.png",
    alt: "Bus Ticket Order - Німеччина (Germany)",
  },
  {
    title: "Чехія",
    subTitle: "Чудова Чехія. Комфортні автобусні поїздки з нами!",
    src: "/assets/website/czech.png",
    alt: "Bus Ticket Order - Чехія (Czech Republic)",
  },
  {
    title: "Нідерланди",
    subTitle: "Подорожуйте з нами до Нідерландів, однієї з найкрасивіших країн",
    src: "/assets/website/niderland.png",
    alt: "Bus Ticket Order - Нідерланди (Niderland)",
  },
  {
    title: "Бельгія",
    subTitle: "Ви коли-небудь були в Бельгії? Сюди з комфортом можна доїхати на «Кореті»",
    src: "/assets/website/belgium.png",
    alt: "Bus Ticket Order - Бельгія (Belgium)",
  },
  {
    title: "Швейцарія",
    subTitle: "Гори, озера, луки. Це Швейцарія!",
    src: "/assets/website/sweden.png",
    alt: "Bus Ticket Order - Швейцарія (Sweden)",
  },
];

export const CountryImageCard = () => {
  return (
    <ImageCardSection>
      <HeaderTitle>КВИТКИ В КРАЇНИ ЄВРОПИ</HeaderTitle>
      <Grid container spacing={2}>
        {cardData.map(
          (
            {
              maxWidth = "352px",
              maxHeight = "424px",
              margin = "0 auto",
              title,
              subTitle,
              smGrid = 4,
              width = 0,
              height = 0,
              ...rest
            },
            index
          ) => (
            <Grid item xs={12} sm={smGrid} key={index}>
              <CountryImageLayout {...{ title, subTitle }}>
                <StyledImage
                  sizes="100vw"
                  quality={100}
                  style={{
                    maxWidth,
                    maxHeight,
                    margin,
                  }}
                  {...{ height, width, ...rest }}
                />
              </CountryImageLayout>
            </Grid>
          )
        )}
      </Grid>
    </ImageCardSection>
  );
};

const HeaderTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  line-height: 64px;
  margin: 0 auto;
  color: ${WebsiteColors.PRIMARY};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ImageCardSection = styled.section`
  margin: 90px auto;
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media (max-width: 768px) {
    margin: 50px auto;
    gap: 12px;
  }
`;

const StyledImage = styled(Image)`
  min-width: 304px;
  min-height: 272px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    min-height: 180px;
    width: 100%;
    object-fit: fill;
  }
`;
