import Head from "next/head";

import Layout from "layouts/dashboard/layout";

import SectionCustomers from 'admin-components/SectionCustomers';

const Page = () => {
  return (
    <>
      <Head>
        <title>Клиенты | Koreta Bus</title>
      </Head>
      <SectionCustomers />
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
