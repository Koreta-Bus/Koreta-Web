import dynamic from "next/dynamic";

import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";

const AccountProfile = dynamic(() => import('sections/account/account-profile'));
const AccountProfileDetails = dynamic(() => import('sections/account/account-profile-details'));

const SectionAccounts = () => {
    return <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">Аккаунт</Typography>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <AccountProfile />
            </Grid>
            <Grid xs={12} md={6} lg={8}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  </Box>
}

export default SectionAccounts