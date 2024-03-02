import { AccordionDetails, AccordionSummary } from "@mui/material";
import { MainFooter } from "components/website-footer";
import { WebsitePageLayouts } from "layouts/website";
import { OrderForm } from "sections/home/order-form";
import { Icon } from "shared/IconGenerator";
import { PageSectionWrapper, SectionTitle } from "components/styled.global";
import {
  AccordionSubWrapper,
  AccordionWrapper,
  StyledAccordion,
  StyledBodyTypography,
  StyledTitleTypography,
} from "./faq.styled";

const FaqAccordion = () => {
  return (
    <div>
      <OrderForm />
      <WebsitePageLayouts>
        <PageSectionWrapper>
          <SectionTitle>FAQ</SectionTitle>
          <AccordionWrapper>
            <AccordionSubWrapper>
              <StyledAccordion>
                <AccordionSummary
                  expandIcon={<Icon name="down_arrow_accordion" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTitleTypography>Скільки коштує бронювання?</StyledTitleTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledBodyTypography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                  </StyledBodyTypography>
                </AccordionDetails>
              </StyledAccordion>
              <StyledAccordion>
                <AccordionSummary
                  expandIcon={<Icon name="down_arrow_accordion" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTitleTypography>
                    Прізвище та ім'я латиницею чи кирилицею?
                  </StyledTitleTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledBodyTypography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                  </StyledBodyTypography>
                </AccordionDetails>
              </StyledAccordion>
              <StyledAccordion>
                <AccordionSummary
                  expandIcon={<Icon name="down_arrow_accordion" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTitleTypography>
                    Чи обов'язково роздруковувати підтвердження/квиток?
                  </StyledTitleTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledBodyTypography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                  </StyledBodyTypography>
                </AccordionDetails>
              </StyledAccordion>
              <StyledAccordion>
                <AccordionSummary
                  expandIcon={<Icon name="down_arrow_accordion" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTitleTypography>
                    Який формат введення номера телефону?
                  </StyledTitleTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledBodyTypography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                  </StyledBodyTypography>
                </AccordionDetails>
              </StyledAccordion>
            </AccordionSubWrapper>
          </AccordionWrapper>
        </PageSectionWrapper>
      </WebsitePageLayouts>
      <MainFooter />
    </div>
  );
};

export default FaqAccordion