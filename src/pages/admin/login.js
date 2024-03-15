import Head from "next/head";

import { Layout } from "layouts/auth/layout";

import SectionLogin from 'admin-components/SectionLogin';

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
