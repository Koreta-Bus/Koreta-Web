import { ContactCard } from "components/contact-card";

import { WebsitePageLayouts } from "layouts/website";

import { PageSectionWrapper, SectionTitle } from "components/styled.global";

import { DefaultLayout } from "layouts/website/DefaultLayout";

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

const ContactSection = () => {
  return (
    <div>
      <DefaultLayout>
        <WebsitePageLayouts>
          <PageSectionWrapper>
            <SectionTitle>Наші контакти</SectionTitle>
            <ContactCard {...{ ContactCardInfos }} />
          </PageSectionWrapper>
        </WebsitePageLayouts>
      </DefaultLayout>
    </div>
  );
};

export default ContactSection;
