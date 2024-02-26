import { WebsitePageLayouts } from "layouts/website";
import { InfoCard } from "components/info-card";
import { CountryImageCard } from "components/country-image-card";
import { MainFooter } from "components/website-footer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { OrderForm } from "./order-form";
import { LandingContainer, LandingPage } from "./home.styled";
import { useLazyGetSearchBusDirectionsQuery } from "store/apis";
import { ImageCard } from "components/image-card";
import { KoretaOwnDirections } from "components/koreta-own-directions";

export const BusTickerOrder = () => {
  const [
    getSearchBusDirections,
    { data: busDirections, isSuccess, error, isLoading: busDirectionsLoading },
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
