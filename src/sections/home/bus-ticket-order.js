import { WebsitePageLayouts } from "layouts/website";
import { InfoCard } from "components/info-card";
import { ImageCard } from "components/image-card";
import { CountryImageCard } from "components/country-image-card";
import { MainFooter } from "components/website-footer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { OrderForm } from "./order-form";
import { LandingContainer, LandingPage } from "./home.styled";

export const BusTickerOrder = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LandingContainer>
        <LandingPage>
          <OrderForm />
          <WebsitePageLayouts>
            <InfoCard />
            <ImageCard />
            <CountryImageCard />
          </WebsitePageLayouts>
          <MainFooter />
        </LandingPage>
      </LandingContainer>
    </LocalizationProvider>
  );
};
