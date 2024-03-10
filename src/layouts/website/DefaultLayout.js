import dynamic from "next/dynamic";

import { MainFooter } from "components/website-footer";

const OrderForm = dynamic(() => import("sections/home/order-form"), {
  ssr: false,
});

export const DefaultLayout = ({ children }) => {
  return (
    <>
      <OrderForm />
      {children}
      <MainFooter />
    </>
  );
};
