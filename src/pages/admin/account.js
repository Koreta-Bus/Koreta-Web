import Head from "next/head";

import Layout from 'layouts/dashboard/layout';
import SectionAccounts from 'admin-components/SectionAccounts';

const Page = () => (
  <>
    <Head>
      <title>Аккаунт | Koreta</title>
    </Head>
    <SectionAccounts />
  </>
);

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
