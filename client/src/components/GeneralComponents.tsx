import { Button, Checkbox, Typography } from "@mui/material";

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
