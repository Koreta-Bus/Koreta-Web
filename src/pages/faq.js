import Head from "next/head";
import dynamic from "next/dynamic";

const FaqAccordion = dynamic(() => import('sections/faq/faq-accordion'));

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
