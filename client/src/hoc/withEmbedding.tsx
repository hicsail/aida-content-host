import { Box, Typography } from "@mui/material";
import { ComponentType } from "react";

export const withEmbedding =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    const isEmbedded = window.self !== window.top;

    if (!isEmbedded) {
      console.error("Access Denied");
      return (
        <Box>
          <Typography variant="h3">Access Denied</Typography>
          <Typography variant="body1">No direct access allowed.</Typography>
        </Box>
      );
    }

    return <Component {...props} />;
  };
