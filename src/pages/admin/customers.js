import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "layouts/dashboard/layout";

const SectionCustomers = dynamic(() => import("admin-components/SectionCustomers"));

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
