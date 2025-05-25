import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const Footer = ({ selected }) => {
    return (
        <Box sx={{ backgroundColor: "#fff", width: "100%", padding: "10px 20px", boxShadow: "0 -1px 5px rgba(0,0,0,0.1)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">

                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Order Type</Typography>
                    <Typography variant="body2" color="text.secondary">{selected}</Typography>
                </Box>


                <Button
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "#fff", textTransform: "none", px: 3, py: 1.5 }}
                    endIcon={<Icon icon="stash:caret-right-duotone" width="20" height="20" />}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
};

export default Footer;
