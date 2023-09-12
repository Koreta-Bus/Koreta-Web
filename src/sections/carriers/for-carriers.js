import {
  InfoCardTitle,
  InfoCardWrapper,
  PageSectionWrapper,
  SectionTitle,
} from "components/styled.global";
import { WebsitePageLayouts } from "layouts/website";
import { WebsiteColors } from "theme/colors";
import { OrderForm } from "sections/home/order-form";
import { MainFooter } from "components/website-footer";
import { AboutusCard } from "components/about-us-card";
import { DriverForm } from "components/driver-form";

import styled from "styled-components";

const AboutusInfoCard = [
  {
    infoTitle: "Особливості роботи",
    detailTitles: [
      {
        key: "text2",
        text: "При оплаті готівкою водію - кошти одразу у перевізника",
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
    infoTitle: "Високий відсоток явки",
    detailTitles: [
      {
        key: "text4",
        text: "Якісна робота з пасажирами",
      },
      {
        key: "text5",
        text: "Надання усієї інформації",
      },
      {
        key: "text6",
        text: "Автоматизовані інформування",
      },
      {
        key: "text7",
        text: "Автоматизовані інформування",
      },
    ],
  },
  {
    infoTitle: "Онлайн кабінет",
    detailTitles: [
      {
        key: "text8",
        text: "Перегляд наявних броней",
      },
      {
        key: "text9",
        text: "Звітність та статистика",
      },
      {
        key: "text10",
        text: "Зміна тарифів, закриття/відкриття продажів",
      },
      {
        key: "text11",
        text: "Інформування про нові броні/скасування",
      },
    ],
  },
];

export const ForCarriersSection = () => {
  return (
    <div>
      <OrderForm />
      <WebsitePageLayouts>
        <PageSectionWrapper>
          <SectionTitle>Для перевізників</SectionTitle>
          <AboutUsInfoSection>
            <HeaderInfo>
              Пропонуємо співпрацю перевізникам, що працюють на ринках Європи та України.
            </HeaderInfo>
            <p>
              <strong>Koreta</strong>- сервіс, що дозволяє бронювати квитки наступними способами:
            </p>
            <OrderedList>
              <li>оплата безпосередньо при посадці у водія</li>
              <li>викупити квиток онлайн через наш сайт</li>
              <li>часткова оплата онлайн, доплата решти вартості водію при посадці</li>
            </OrderedList>
            <p>
              Для зручності роботи розроблений особистий кабінет, за допомогою якого ви можете
              бачити перелік Ваших рейсів, переглядати наявні на Ваші лінії бронювання, а також
              вести звітність та статистику по клієнтах, що поїхали. Можливі різні технічні
              можливості реалізації співпраці та гнучкі умови.
            </p>
            <p style={{ marginTop: "24px" }}>
              <strong>Обов'язкові вимоги до перевізника:</strong>:
            </p>
            <OrderedList>
              <li>
                Наявність не менше двох автобусів (40+ посадкових місць кожен), які відповідають
                стандарту Євро-4.
              </li>
              <li>Наявність ліцензії на пасажирські перевезення</li>
              <li>Підписання договору</li>
            </OrderedList>
            <BottomInfo>
              Якщо Вас зацікавила наша пропозиція, ви можете зв'язатись з нами за номером:
              <strong>+380 73 216 6696</strong>, або заповніть форму нижче і ми з Вами зв'яжемось.
            </BottomInfo>
          </AboutUsInfoSection>
          <InfoCardWrapper>
            <InfoCardTitle>НАШІ ПЕРЕВАГИ</InfoCardTitle>
            <AboutusCard cardInfos={AboutusInfoCard} height={"268px"} mobileHeight={"232px"} />
          </InfoCardWrapper>
          <DriverForm />
        </PageSectionWrapper>
      </WebsitePageLayouts>
      <MainFooter />
    </div>
  );
};

const BottomInfo = styled.p``;

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
  color: ${WebsiteColors.BLACK_PRIMARY};
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 56px;
`;
