import Image from "next/image";

import { useTheme } from "@mui/material/styles";


export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return <Image alt="logo" src="/assets/koreta-logo.png" width={100} height={100} color={fillColor} />;
};
