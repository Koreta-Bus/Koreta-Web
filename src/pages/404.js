import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { WebsiteColors } from "theme/colors";
import { styled } from "styled-components";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>404 | Devias Kit</title>
      </Head>
      <ContainerError>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  mb: 3,
                  textAlign: "center",
                }}
              >
                <StyledImage
                  alt="Under development"
                  src="/assets/errors/error-404.png"
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    width: 400,
                  }}
                />
              </Box>
              <Typography align="center" sx={{ mb: 3 }} variant="h3">
                404: The page you are looking for isn’t here
              </Typography>
              <StyledGoBackToHomeBtn onClick={() => router.push('/')}>
                Go back to Koreta Home
              </StyledGoBackToHomeBtn>
            </Box>
          </Container>
        </Box>
      </ContainerError>
    </>
  );
};

const StyledImage = styled.img`
  @media (max-width: 768px) {
    width: 70% !important;
  }
`;

const ContainerError = styled.div`
  font-family: Lora, sans-serif;

  @media (max-width: 768px) {
    margin-top: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledGoBackToHomeBtn = styled.button`
  background-color: ${WebsiteColors.PRIMARY};
  padding: 16px 30px;
  color: white;
  outline: none;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-family: Sora, sans-serif;
  margin-top: 1rem;
  cursor: pointer;

  :hover {
    background-color: red;
  }
`;

export default Page;
