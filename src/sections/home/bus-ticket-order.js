import { WebsitePageLayouts } from "layouts/website";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { InfoCard } from "components/info-card";
import { MainFooter } from "components/website-footer";
import { CountryImageCard } from "components/country-image-card";

import { LandingContainer, LandingPage } from "./home.styled";

import { useLazyGetSearchBusDirectionsQuery } from "store/apis";

import { KoretaOwnDirections } from "components/koreta-own-directions";

import OrderForm from "./order-form";

const BusTicketOrder = () => {
  const [
    getSearchBusDirections,
    { isLoading: busDirectionsLoading },
  ] = useLazyGetSearchBusDirectionsQuery();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            {/* <ImageCard /> */}
            <CountryImageCard />
          </WebsitePageLayouts>
          <MainFooter />
        </LandingPage>
      </LandingContainer>
    </LocalizationProvider>
  );
};

export default BusTicketOrder