import {
    Home as HomeIcon,
    Login as SignInIcon,
    Logout as SignOutIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import _ from "lodash";
import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";
import { RemoveUserToken } from "../../utils/HandleUserToken";

const UnauthenticatedSidebarLinks = [
    {
        title: "Home",
        path: "/",
        icon: <HomeIcon />,
    },
    {
        title: "Sign In",
        path: "/signin",
        icon: <SignInIcon />,
    },
    {
        title: "Sign Up",
        path: "/signup",
        icon: <SignInIcon />,
    },
];

let UpperSidebarLinks = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <HomeIcon />,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <PersonIcon />,
    },
];

const LowerSidebarLinks = [];

const Sidebar = ({ isOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    const { userData, isUserAuthenticated, setIsUserAuthenticated } =
        useContext(UserDataContext);

    let MainSidebarLinks;
    if (!isUserAuthenticated) {
        MainSidebarLinks = UnauthenticatedSidebarLinks;
    } else {
        MainSidebarLinks = UpperSidebarLinks;
    }

    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
            <Box
                sx={{
                    width: 250,
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Typography
                    component="div"
                    variant="body1"
                    sx={{
                        p: "18px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    Hello {_.get(userData, "firstName", "User")}
                </Typography>

                <Divider />

                <List>
                    {MainSidebarLinks.map((link) => (
                        <ListItem
                            button
                            key={link.title}
                            onClick={() => navigate(link.path)}
                        >
                            <ListItemIcon>{link.icon}</ListItemIcon>
                            <ListItemText primary={link.title} />
                        </ListItem>
                    ))}
                </List>

                {isUserAuthenticated ? (
                    <Fragment>
                        <Divider />

                        <List>
                            {LowerSidebarLinks.map((link) => (
                                <ListItem
                                    button
                                    key={link.title}
                                    onClick={() => navigate(link.path)}
                                >
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText primary={link.title} />
                                </ListItem>
                            ))}

                            <ListItem
                                button
                                onClick={() => {
                                    RemoveUserToken(() => {
                                        setIsUserAuthenticated(false);
                                        navigate("/");
                                    });
                                }}
                            >
                                <ListItemIcon>
                                    <SignOutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign Out" />
                            </ListItem>
                        </List>
                    </Fragment>
                ) : null}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
