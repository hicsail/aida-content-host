import { Box, Button, Checkbox, Typography } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const StyledTypography = ({ sx, ...props }: any) => (
  <Typography
    gutterBottom
    sx={{
      color: "#16191b",
      marginBottom: "0.6em",
      fontWeight: 600,
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      ...sx,
    }}
    {...props}
  />
);

const markdownComponents = {
  h1: ({ children }: any) => (
    <StyledTypography
      variant="h4"
      sx={{
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontSize: "1.5rem",
        fontWeight: "bold",
        mt: 2,
      }}
    >
      {children}
    </StyledTypography>
  ),
  h2: ({ children }: any) => (
    <StyledTypography
      variant="h5"
      sx={{
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontSize: "1.3rem",
        fontWeight: "bold",
        mt: 2,
      }}
    >
      {children}
    </StyledTypography>
  ),
  h3: ({ children }: any) => (
    <StyledTypography
      variant="h6"
      sx={{
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontSize: "1.2rem",
        fontWeight: "bold",
        mt: 1.5,
      }}
    >
      {children}
    </StyledTypography>
  ),
  p: ({ children }: any) => (
    <StyledTypography
      sx={{
        color: "#16191b",
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontWeight: 400,
        fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
        lineHeight: "1.5",
        mt: 1,
      }}
    >
      {children}
    </StyledTypography>
  ),
  ul: ({ children }: any) => (
    <Box
      component="ul"
      sx={{
        color: "#16191b",
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontWeight: 400,
        fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
        paddingLeft: 3,
        mt: 1,
      }}
    >
      {children}
    </Box>
  ),
  ol: ({ children }: any) => (
    <Box
      component="ol"
      sx={{
        color: "#16191b",
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontWeight: 400,
        fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
        paddingLeft: 3,
        mt: 1,
      }}
    >
      {children}
    </Box>
  ),
  li: ({ children }: any) => (
    <StyledTypography
      component="li"
      sx={{
        color: "#16191b",
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontWeight: 400,
        fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
        mt: 0.5,
      }}
    >
      {children}
    </StyledTypography>
  ),
  a: ({ href, children }: any) => (
    <StyledTypography
      component="a"
      href={href}
      sx={{
        color: "#1976d2",
        fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
        fontWeight: 400,
        fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
        textDecoration: "underline",
        "&:hover": { color: "#125a9d" },
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </StyledTypography>
  ),
};

export const StyledMarkdown = ({ sx, ...props }: any) => (
  <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents} {...props} />
);

export const TypographyH3 = ({ sx, ...props }: any) => (
  <StyledTypography
    sx={{
      fontSize: "clamp(1.73rem, calc(1.59rem + 0.78vw), 2.2rem)",
      ...sx,
    }}
    {...props}
  />
);

export const TypographyH4 = ({ sx, ...props }: any) => (
  <StyledTypography
    sx={{
      fontSize: "clamp(1.44rem, calc(1.35rem + 0.53vw), 1.76rem)",
      ...sx,
    }}
    {...props}
  />
);

export const TypographyH5 = ({ sx, ...props }: any) => (
  <StyledTypography
    sx={{
      fontSize: "clamp(1.20rem, calc(1.14rem + 0.34vw), 1.41rem)",
      ...sx,
    }}
    {...props}
  />
);

export const TypographyBody = ({ sx, ...props }: any) => (
  <Typography
    sx={{
      color: "#16191b",
      margin: "0 0 1.5em 0",
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      fontSize: "clamp(1.00rem, calc(0.96rem + 0.21vw), 1.13rem)",
      ...sx,
    }}
    {...props}
  />
);

export const TypographyExcerpt = ({ sx, ...props }: any) => (
  <Typography
    sx={{
      color: "#16191b",
      margin: "0 0 1.5em 0",
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
      ...sx,
    }}
    {...props}
  />
);

export const TypographyLink = ({ sx, ...props }: any) => (
  <Typography
    sx={{
      cursor: "pointer",
      color: "#c00",
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      fontSize: "clamp(0.83rem, calc(0.81rem + 0.11vw), 0.90rem)",
      textDecoration: "none",
      background: "no-repeat 0 100%",
      backgroundImage: "linear-gradient(#c00, #c00)",
      backgroundSize: "0% 2px",
      transition: "background-size 375ms ease-in-out",
      "&:hover": {
        color: "maroon",
        backgroundSize: "100% 2px",
        backgroundImage: "linear-gradient(maroon, maroon)",
      },
      ...sx,
    }}
    {...props}
  />
);

export const StyledCheckbox = ({ sx, ...props }: any) => (
  <Checkbox
    sx={{
      textAlign: "left",
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      "&.MuiCheckbox-indeterminate": {
        color: "maroon",
      },
      "&.Mui-checked": {
        color: "maroon",
      },
      "& .MuiSvgIcon-root": { fontSize: 25 },
      ...sx,
    }}
    {...props}
  />
);

export const StyledButton = ({ sx, ...props }: any) => (
  <Button
    sx={{
      borderColor: "#c00",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      fontFamily: ["Barlow Semi Condensed", "sans-serif"].join(","),
      "&.MuiButton-contained": {
        color: "white",
        backgroundColor: "#c00",
      },
      "&.MuiButton-outlined": {
        color: "#c00",
        "&:hover": {
          color: "white",
        },
        "&:active": {
          color: "white",
        },
        "&:focus": {
          color: "white",
        },
      },
      "&:hover": {
        backgroundColor: "maroon",
      },
      "&:active": {
        backgroundColor: "maroon",
      },
      "&:focus": {
        backgroundColor: "maroon",
      },
      ...sx,
    }}
    {...props}
  />
);
