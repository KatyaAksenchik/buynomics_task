import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { routes } from '../../initialisation/routes';
import { Header } from '../../component/Header/Header';

export const RootView = () => (
    <React.Fragment>
        <Header />
        <Box sx={{ paddingTop: "30px" }}>
            <Container>
                {routes}
            </Container>
        </Box>
    </React.Fragment>
);
