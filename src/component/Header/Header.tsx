import React from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants/routes';

export const Header = () => (
    <AppBar
        position="static"
        color="primary"
    >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Link to={ROUTE_PATH.home}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, color: 'white' }}
                    >
                        BUYNOMICS
                    </Typography>
                </Link>
            </Toolbar>
        </Container>
    </AppBar>
)