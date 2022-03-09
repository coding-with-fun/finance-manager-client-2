import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDrawer = (flag) => () => {
        setIsSidebarOpen(flag);
    };

    return (
        <Fragment>
            <Sidebar toggleDrawer={toggleDrawer} isOpen={isSidebarOpen} />

            <Box
                sx={{
                    flexGrow: 1,
                    mb: "64px",
                }}
            >
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                mr: 2,
                            }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")}
                        >
                            FiPlan
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
};

export default Navbar;
