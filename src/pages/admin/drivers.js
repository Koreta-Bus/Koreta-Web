import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "layouts/dashboard/layout";

const SectionDrivers = dynamic(() => import("admin-components/SectionDrivers"));

const Page = () => {
  return (
    <>
      <Head>
        <title>Водители | Koreta Bus</title>
      </Head>
      <SectionDrivers />
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
