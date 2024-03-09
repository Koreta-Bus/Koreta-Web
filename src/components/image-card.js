import React from "react";

import Image from "next/image";

import { Grid } from "@mui/material";

import { ImageCardLayout } from "layouts/website/ImageCardLayout";

import styled from "styled-components";

const cardData = [
  {
    title: "Маршрути",
    subTitle: "Подорожуючи багатьма містами",
    src: "/assets/website/bus-card.jpg",
    alt: "Bus Ticket Order - Travel Bus",
    maxWidth: "1040px",
    height: "auto",
    margin: "0 auto",
    smGrid: 12,
    width: 0,
    height: 0,
  },
  {
    title: "Комфорт",
    subTitle: "Зручні сидіння, досвідчені водії",
    src: "/assets/website/bus-inside.png",
    alt: "Bus Ticket Order - Travel Road Bus",
    maxWidth: "368px",
    maxHeight: "212px",
    margin: "0 auto",
    smGrid: 5,
    width: 0,
    height: 0,
  },
  {
    title: "Сімейний-дружній",
    subTitle: "Смішна та безпечна подорож автобусом для будь-якого віку",
    src: "/assets/website/friendly-nany.png",
    alt: "Bus Ticket Order - Travel Friendly",
    maxWidth: "572px",
    maxHeight: "212px",
    margin: "0 auto",
    smGrid: 7,
    width: 0,
    height: 0,
  },
];

export const ImageCard = () => {
  return (
    <ImageCardSection>
      <Grid container spacing={2}>
        {cardData.map(
          ({ maxWidth, maxHeight, margin, title, subTitle, smGrid, ...rest }, index) => (
            <Grid item xs={12} sm={smGrid} key={index}>
              <ImageCardLayout {...{ title, subTitle }}>
                <StyledImage
                  sizes="100vw"
                  quality={100}
                  style={{
                    margin,
                    maxWidth,
                    maxHeight,
                  }}
                  {...rest}
                />
              </ImageCardLayout>
            </Grid>
          )
        )}
      </Grid>
    </ImageCardSection>
  );
};

const ImageCardSection = styled.section`
  margin: 90px auto;

  @media (max-width: 768px) {
    margin: 50px auto;

    .MuiGrid-root.MuiGrid-container{
      padding-left: 0px;
    }
  }
`;

const StyledImage = styled(Image)`
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
