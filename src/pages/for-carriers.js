import Head from "next/head";

import ForCarriersSection from 'sections/carriers/for-carriers';

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket For Carriers Page</title>
    </Head>
    <ForCarriersSection />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
