import {
  SectionTitle,
  InfoCardTitle,
  InfoCardWrapper,
  PageSectionWrapper,
} from "components/styled.global";

import { WebsitePageLayouts } from "layouts/website";
import { DefaultLayout } from "layouts/website/DefaultLayout";

import { WebsiteColors } from "theme/colors";

import { AboutusCard } from "components/about-us-card";

import styled from "styled-components";

const AboutusInfoCard = [
  {
    infoTitle: "Особливості роботи",
    detailTitles: [
      {
        key: "text2",
        text: "Багато варіантів оплати за поїздку",
      },
      {
        key: "text1",
        text: "Розрахунок до 15 числа наступного місяця",
      },
      {
        key: "text3",
        text: "Менеджер допоможе вирішити питання, що виникають",
      },
    ],
  },
  {
    infoTitle: "Надійні перевізники",
    detailTitles: [
      {
        key: "text4",
        text: "Лише офіційні перевізники",
      },
      {
        key: "text5",
        text: "Усі рейси виконуються",
      },
      {
        key: "text6",
        text: "Автоматизовані інформування пасажирів",
      },
    ],
  },
  {
    infoTitle: "Онлайн кабінет",
    detailTitles: [
      {
        key: "text5",
        text: "Перегляд наявних броней",
      },
      {
        key: "text6",
        text: "Звітність та статистика",
      },
      {
        key: "text7",
        text: "Доступна інформація про поїздки",
      },
    ],
  },
];

const AboutUsSection = () => {
  return (
    <div>
      <DefaultLayout>
        <WebsitePageLayouts>
          <PageSectionWrapper>
            <SectionTitle>Про нас</SectionTitle>
            <AboutUsInfoSection>
              <HeaderInfo>
                Пропонуємо співпрацю агенціям, що працюють у сфері продажу квитків на міжнародні
                пасажирські перевезення, а також компаніям, що працюють на ринках працевлштування у
                країнах Європи.
              </HeaderInfo>
              <p>
                <strong>Koreta</strong>- сервіс, що дозволяє бронювати квитки наступними способами:
              </p>
              <OrderedList>
                <li>оплата безпосередньо при посадці у водія</li>
                <li>викупити квиток онлайн через наш сайт</li>
                <li>оплата готівкою у Вас в офісі</li>
                <li>часткова оплата онлайн, доплата решти вартості водію при посадці</li>
              </OrderedList>
              <p>
                За день до виїзду, до 22:00, ми надаємо детальну інформацію щодо поїздки (місце
                посадки, номерний знак автобуса та за наявності фото автобуса та номер до водія).
              </p>
              <p>
                Для зручності роботи розроблений особистий кабінет, за допомогою якого ви можете
                бачити перелік усіх рейсів, здійснювати бронювання, а також вести звітність та
                статистику по клієнтах, що поїхали від вас та розраховувати винагороду по
                результатах місяця.
              </p>
              <p>Можливі різні технічні можливості реалізації співпраці та гнучкі умови.</p>
              <BottomInfo>
                Якщо Вас зацікавила наша пропозиція, ви можете зв'язатись з нами за номером:{" "}
                <strong>+380 97 146 1991</strong>, або заповніть форму нижче і ми з Вами зв'яжемось.
              </BottomInfo>
            </AboutUsInfoSection>
            <InfoCardWrapper>
              <InfoCardTitle>НАШІ ПЕРЕВАГИ</InfoCardTitle>
              <AboutusCard cardInfos={AboutusInfoCard} />
            </InfoCardWrapper>
          </PageSectionWrapper>
        </WebsitePageLayouts>
      </DefaultLayout>
    </div>
  );
};

export default AboutUsSection;

const BottomInfo = styled.p`
  padding-top: 32px;

  @media (max-width: 768px) {
    padding-top: 24px;
  }
`;

const OrderedList = styled.ol`
  padding-left: 3rem;
  padding-top: 4px;
  padding-bottom: 32px;
`;

const HeaderInfo = styled.p`
  margin-bottom: 24px;
`;

const AboutUsInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Sora, sans-serif;
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 56px;
`;
