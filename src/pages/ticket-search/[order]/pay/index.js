import { useEffect } from "react";

import { useSelector } from "react-redux";

import Head from "next/head";
import { useRouter } from "next/router";

import { styled } from "styled-components";

import { DefaultLayout } from "layouts/website/DefaultLayout";

import { WebsiteColors } from "theme/colors";

import { isEmpty, noop } from "shared/common";

const Page = () => {
  const router = useRouter();

  const { formPay } = useSelector((state) => state.searchBusDirections);

  useEffect(() => {
    isEmpty(formPay) && router.push("/ticket-search");
    return noop;
  }, []);

  return (
    <>
      <Head>
        <title>Koreta | Bus Ticket Pay</title>
      </Head>
      <DefaultLayout>
        <Container>
          <h2>Результат</h2>
          <SuccessContainer>
            <div>
              Будь ласка, оплатіть своє замовлення протягом 30 хвилин, інакше ми відхилимо ваше
              замовлення.
            </div>
            <div>Ви можете легко оплатити своє замовлення прямо внизу.</div>
            <PaymentName>
              Lig <strong>Pay</strong>
            </PaymentName>
            <form method="POST" action={formPay?.action} accept-charset="utf-8">
              <input type="hidden" name="data" value={formPay?.data} />
              <input type="hidden" name="signature" value={formPay?.signature} />
              <input
                type="image"
                src="//static.liqpay.ua/buttons/p1en.radius.png"
                name="btn_text"
              />
            </form>
          </SuccessContainer>
        </Container>
      </DefaultLayout>
    </>
  );
};

const PaymentName = styled.span`
  color: #6ca81d;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.3rem;

  strong {
    color: black;
  }
`;

const Container = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 48px 40px 40px 50px;

  h2 {
    color: ${WebsiteColors.PRIMARY};
    font-family: Lora, sans-serif;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;

    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  margin: 0 auto;
  max-width: 1220px;
  padding: 48px 48px 48px 48px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 28px;
    margin-top: 32px;
  }
`;

Page.getLayout = (page) => <>{page}</>;

export default Page;
