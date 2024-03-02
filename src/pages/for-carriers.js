import Head from "next/head";
import dynamic from "next/dynamic";

const ForCarriersSection = dynamic(() => import('sections/carriers/for-carriers'));

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
