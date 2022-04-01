import React, { FC } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PlaceholderProperties {
    text: string
}

export const Placeholder: FC<PlaceholderProperties> = props => {
    const { text } = props;

    return (
        <Box sx={{ paddingTop: "30px" }}>
            <Typography
                variant="h4"
                component="h1"
                align="center"
            >
                {text}
            </Typography>
        </Box>
    )
}