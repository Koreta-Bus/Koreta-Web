import Head from "next/head";

import { BusTickerOrder } from "sections/home/bus-ticket-order";

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket Home Page</title>
    </Head>
    <BusTickerOrder />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
