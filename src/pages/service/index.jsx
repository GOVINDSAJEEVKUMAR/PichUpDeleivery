import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import Footer from '../footer';

const Service = ({ scroll, selected, setSelected }) => {


    return (
        <Box sx={{ backgroundColor: "#0f0f0f", minHeight: "100vh", py: 5 }}>
            <Typography variant="h4" color="#fff" align="center" gutterBottom>
                Mode of Services
            </Typography>

            <Grid container spacing={4} justifyContent="center">

                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            padding: "32px",
                            textAlign: "center",
                            border: selected === 'regular' ? "3px solid #f5d97b" : "1px solid #ddd",
                            boxShadow: selected === 'regular' ? "0 0 20px rgba(245, 217, 123, 0.6)" : "none",
                            transition: "0.3s"
                        }}
                    >
                        <Icon icon="material-symbols:inventory-2-outline" width="60" height="60" />
                        <Typography variant="h5" mt={2}>Regular</Typography>
                        <Typography variant="body1" mt={1} color="gray">Expected Delivery</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#e7c664",
                                color: "#000",
                                mt: 2,
                                borderRadius: "30px",
                                px: 4,
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}
                            disableElevation
                        >
                            1-2 Working Days
                        </Button>
                        <Typography variant="caption" display="block" mt={2}>
                            Free delivery above 39 SAR
                        </Typography>
                        <Button
                            variant={selected === 'regular' ? "contained" : "outlined"}
                            sx={{
                                backgroundColor: selected === 'regular' ? "#fef3c7" : "transparent",
                                color: selected === 'regular' ? "#000" : "#e7c664",
                                borderColor: "#e7c664",
                                borderRadius: "30px",
                                mt: 3,
                                px: 5,
                                fontWeight: "bold"
                            }}
                            onClick={() => { setSelected('regular'); scroll(); }}
                        >
                            {selected === 'regular' ? 'Selected' : 'Select'}
                        </Button>
                    </Box>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            padding: "32px",
                            textAlign: "center",
                            border: selected === 'express' ? "3px solid #f5d97b" : "1px solid #ddd",
                            boxShadow: selected === 'express' ? "0 0 20px rgba(245, 217, 123, 0.6)" : "none",
                            transition: "0.3s"
                        }}
                    >
                        <Icon icon="material-symbols:local-shipping-outline" width="60" height="60" />
                        <Typography variant="h5" mt={2}>Express</Typography>
                        <Typography variant="body1" mt={1} color="gray">Expected Delivery</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#e7c664",
                                color: "#000",
                                mt: 2,
                                borderRadius: "30px",
                                px: 4,
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}
                            disableElevation
                        >
                            12 Hours
                        </Button>
                        <Typography variant="caption" display="block" mt={2}>
                            Nominal charges apply
                        </Typography>
                        <Button
                            variant={selected === 'express' ? "contained" : "outlined"}
                            sx={{
                                backgroundColor: selected === 'express' ? "#fef3c7" : "transparent",
                                color: selected === 'express' ? "#000" : "#e7c664",
                                borderColor: "#e7c664",
                                borderRadius: "30px",
                                mt: 3,
                                px: 5,
                                fontWeight: "bold"
                            }}
                            onClick={() => { setSelected('express'); scroll(); }}
                        >
                            {selected === 'express' ? 'Selected' : 'Select'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
};

export default Service;
