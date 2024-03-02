import Head from "next/head";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('layouts/dashboard/layout'));
const SectionAccounts = dynamic(() => import('admin-components/SectionAccounts'));

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
