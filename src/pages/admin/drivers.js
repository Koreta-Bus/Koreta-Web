import Head from "next/head";

import Layout from "layouts/dashboard/layout";

import SectionDrivers from 'admin-components/SectionDrivers';

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
