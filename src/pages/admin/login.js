import Head from "next/head";

import dynamic from "next/dynamic";

import { Layout } from "layouts/auth/layout";

const SectionLogin = dynamic(() => import("admin-components/SectionLogin"));

const Page = () => {
  return (
    <>
      <Head>
        <title>Login | Koreta</title>
      </Head>
      <SectionLogin />
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
