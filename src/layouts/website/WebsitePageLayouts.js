import styled from "styled-components";

export const WebsitePageLayouts = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  max-width: 1120px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;
