import Head from "next/head";

import Layout from "layouts/dashboard/layout";

import SectionHome from 'admin-components/SectionHome';

const Page = () => (
  <>
    <Head>
      <title>Обзор | Koreta</title>
    </Head>
    <SectionHome />
  </>
);

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
