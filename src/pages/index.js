import Head from "next/head";
import dynamic from "next/dynamic";

const BusTicketOrder = dynamic(() => import('sections/home/bus-ticket-order'), {
  ssr: false
});

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket Home Page</title>
    </Head>
    <BusTicketOrder />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
