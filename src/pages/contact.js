import Head from "next/head";

import ContactSection from 'sections/contact/contact-card';

const Page = () => (
  <>
    <Head>
      <title>Koreta Order Bus Ticket Contact Page</title>
    </Head>
    <ContactSection />
  </>
);

Page.getLayout = (page) => <>{page}</>;

export default Page;
