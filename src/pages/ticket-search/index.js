import Head from "next/head";
import dynamic from "next/dynamic";

const DirectionsSearch = dynamic(() => import("sections/search/directions-search"), {
  ssr: false,
});

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket Search Result</title>
    </Head>
    <DirectionsSearch />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
