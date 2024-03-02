import Head from "next/head";
import dynamic from "next/dynamic";

const ContactSection = dynamic(() => import('sections/contact/contact-card'));

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
