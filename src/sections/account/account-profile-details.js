import { useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export const AccountProfileDetails = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  value="Shahriyar"
                  name="firstName"
                  aria-readonly
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  value="Hasanov"
                  name="lastName"
                  aria-readonly
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  aria-readonly
                  value={"shahriyarhasanov@gmail.com"}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value="+380 68 781 3919"
                  type="text"
                  aria-readonly
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  aria-readonly
                  value={"Ukraine"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
