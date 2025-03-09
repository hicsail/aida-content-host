import {
  AppBar,
  Box,
  ClickAwayListener,
  Container,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { StyledButton } from "../components/GeneralComponents";

export const RootLayout: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleSelect = (path: string) => {
    navigate(`topic-model/${path}`);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#c00",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ ml: "auto", gap: 2, display: "flex" }}>
              <StyledButton
                key="digital-repository"
                size="small"
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={() => navigate("/browse")}
              >
                Digital Repository
              </StyledButton>
              <StyledButton
                ref={anchorRef}
                key="topic-modeling"
                size="small"
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={handleToggle}
              >
                Topic Modeling
              </StyledButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} onKeyDown={() => console.log("key down")}>
                          <MenuItem onClick={() => handleSelect("all")}>All</MenuItem>
                          <MenuItem onClick={() => handleSelect("business")}>Business</MenuItem>
                          <MenuItem onClick={() => handleSelect("education")}>Education</MenuItem>
                          <MenuItem onClick={() => handleSelect("government")}>Government</MenuItem>
                          <MenuItem onClick={() => handleSelect("others")}>Others</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};
