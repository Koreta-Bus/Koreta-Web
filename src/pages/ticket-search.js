import Head from "next/head";
import { DirectionsSearch } from "sections/search/directions-search";

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
