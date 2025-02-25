import { Box, Typography } from "@mui/material";
import { ComponentType } from "react";

const allowedDomains = /\.bu\.edu$/;

export const withDomainCheck =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    if (!allowedDomains.test(window.location.hostname)) {
      console.error("Access Denied");
      return (
        <Box>
          <Typography variant="h1">Access Denied</Typography>
          <Typography variant="body1">
            This chatbot is only accessible from the Boston University domain.
          </Typography>
        </Box>
      );
    }

    return <Component {...props} />;
  };
