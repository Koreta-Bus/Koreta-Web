import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "layouts/dashboard/layout";

const SectionCities = dynamic(() => import("admin-components/SectionCities"));

const Page = () => {
  return (
    <>
      <Head>
        <title>Города | Koreta Bus</title>
      </Head>
      <SectionCities />
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
