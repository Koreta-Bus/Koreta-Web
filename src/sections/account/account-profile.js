import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";

const user = {
  avatar: "/assets/koreta-logo.png",
  city: "Kharkow",
  country: "Ukraine",
  name: "Koreta",
  timezone: "GTM-4",
};

export const AccountProfile = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.city} {user.country}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
