import { AccordionDetails, AccordionSummary } from "@mui/material";

import { WebsitePageLayouts } from "layouts/website";

import { Icon } from "shared/IconGenerator";

import { PageSectionWrapper, SectionTitle } from "components/styled.global";
import {
  StyledAccordion,
  AccordionWrapper,
  AccordionSubWrapper,
  StyledBodyTypography,
  StyledTitleTypography,
} from "./faq.styled";

import { DefaultLayout } from "layouts/website/DefaultLayout";

const FaqAccordion = () => {
  return (
    <div>
      <DefaultLayout>
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
      </DefaultLayout>
    </div>
  );
};

export default FaqAccordion;
