import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { styled } from "styled-components";

import { WebsiteColors } from "theme/colors";

import { Button } from "components/button";

import { DefaultLayout } from "layouts/website/DefaultLayout";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <>
      <Head>
        <title>Koreta | Bus Ticket Order Success</title>
      </Head>
      <DefaultLayout>
        <Container>
          <h2>Результат</h2>
          <SuccessContainer>
            <Success>
              <Image alt="succes" src="/assets/website/success.png" />
            </Success>
            <TextHereInfo>
              <span>Дякуємо! Ваше бронювання успішне!</span>
              <span>Якщо у вас є які-небудь питання, ви можете написати нам.</span>
            </TextHereInfo>
            <div style={{ maxWidth: "max-content" }}>
              <Button
                padding="8px 14px"
                func={() => router.push("/")}
                text={"Повернутися на головну сторінку"}
              />
            </div>
          </SuccessContainer>
        </Container>
      </DefaultLayout>
    </>
  );
};

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${WebsiteColors.PRIMARY};
  align-self: center;
`;

const TextHereInfo = styled.div`
  color: #000000;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Image = styled.img``;

const Success = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #effbf5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  gap: 32px;
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
