import Head from "next/head";

import Layout from "layouts/dashboard/layout";

import SectionCities from 'admin-components/SectionCities';

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
