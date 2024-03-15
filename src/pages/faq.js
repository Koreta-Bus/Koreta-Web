import Head from "next/head";

import FaqAccordion from 'sections/faq/faq-accordion';

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket Faq Page</title>
    </Head>
    <FaqAccordion />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
