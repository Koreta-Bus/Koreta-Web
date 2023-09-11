import Head from "next/head";
import { AboutUsSection } from "sections/aboutus/about-us-info";

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket About Us Page</title>
    </Head>
    <AboutUsSection />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
