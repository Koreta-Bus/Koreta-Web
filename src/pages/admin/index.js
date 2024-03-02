import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "layouts/dashboard/layout";

const SectionHome = dynamic(() => import("admin-components/SectionHome"));

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
