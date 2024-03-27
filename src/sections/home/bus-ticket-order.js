import { WebsitePageLayouts } from "layouts/website";

import { InfoCard } from "components/info-card";
import { MainFooter } from "components/website-footer";
import { CountryImageCard } from "components/country-image-card";

import { LandingContainer, LandingPage } from "./home.styled";

import { useLazyGetSearchBusDirectionsQuery } from "store/apis";

import { KoretaOwnDirections } from "components/koreta-own-directions";

import OrderForm from "./order-form";

const BusTicketOrder = () => {
  const [getSearchBusDirections, { isLoading: busDirectionsLoading }] =
    useLazyGetSearchBusDirectionsQuery();

  return (
    <LandingContainer>
      <LandingPage>
        <OrderForm
          busDirectionsLoading={busDirectionsLoading}
          getSearchBusDirections={getSearchBusDirections}
        />
        <WebsitePageLayouts>
          <div style={{ maxWidth: "1100px", margin: "2.5rem auto" }}>
            <KoretaOwnDirections />
          </div>
          <InfoCard />
          <CountryImageCard />
        </WebsitePageLayouts>
        <MainFooter />
      </LandingPage>
    </LandingContainer>
  );
};

export default BusTicketOrder;
