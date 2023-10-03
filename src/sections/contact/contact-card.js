import { ContactCard } from "components/contact-card";
import { MainFooter } from "components/website-footer";
import { WebsitePageLayouts } from "layouts/website";
import { OrderForm } from "sections/home/order-form";
import { WebsiteColors } from "theme/colors";

import { PageSectionWrapper, SectionTitle } from "components/styled.global";

const ContactCardInfos = [
  {
    id: "location-id",
    iconName: "location",
    title: "Наш офіс",
    subTitle: "м. Львів, вул. Стрийська 109, поверх 3",
    type: "location",
  },
  {
    id: "operator-id",
    iconName: "operator",
    title: "Номер телефону",
    //TODO: change number
    subTitle: "+380 97 146 1991",
    type: "operator",
  },
  {
    id: "message-id",
    iconName: "message",
    title: "Електронна пошта",
    subTitle: "koretabus@gmail.com",
    type: "message",
  },
];

export const ContactSection = () => {
  return (
    <div>
      <OrderForm />
      <WebsitePageLayouts>
        <PageSectionWrapper>
          <SectionTitle>Наші контакти</SectionTitle>
          <ContactCard {...{ ContactCardInfos }} />
        </PageSectionWrapper>
      </WebsitePageLayouts>
      <MainFooter />
    </div>
  );
};

