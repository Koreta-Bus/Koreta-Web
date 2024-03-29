import React from "react";

import Image from "next/image";

import { Grid } from "@mui/material";

import { CountryImageLayout } from "layouts/website/CountryImageLayout";

import { WebsiteColors } from "theme/colors";

import styled from "styled-components";

const cardData = [
  {
    title: "Польща",
    alt: "Bus Ticket Order - Poland",
    src: "/assets/website/poland.png",
    subTitle: "Автобусні маршрути з України в усі куточки Польщі.",
  },
  {
    title: "Німеччина",
    src: "/assets/website/germany.png",
    alt: "Bus Ticket Order - Німеччина (Germany)",
    subTitle: "Комфортна і відмінна поїздка практично в будь-яке місто Німеччини!",
  },
  {
    title: "Чехія",
    src: "/assets/website/czech.png",
    alt: "Bus Ticket Order - Чехія (Czech Republic)",
    subTitle: "Чудова Чехія. Комфортні автобусні поїздки з нами!",
  },
  {
    title: "Нідерланди",
    src: "/assets/website/niderland.png",
    alt: "Bus Ticket Order - Нідерланди (Niderland)",
    subTitle: "Подорожуйте з нами до Нідерландів, однієї з найкрасивіших країн",
  },
  {
    title: "Бельгія",
    src: "/assets/website/belgium.png",
    alt: "Bus Ticket Order - Бельгія (Belgium)",
    subTitle: "Ви коли-небудь були в Бельгії? Сюди з комфортом можна доїхати на «Кореті»",
  },
  {
    title: "Швейцарія",
    src: "/assets/website/sweden.png",
    alt: "Bus Ticket Order - Швейцарія (Sweden)",
    subTitle: "Гори, озера, луки. Це Швейцарія!",
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
  font-family: Lora, sans-serif;

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
