import React from 'react';
import { Card, Button, Typography, Box, Grid, Chip } from '@mui/material';
import { Icon } from '@iconify/react';


const ListBooking = ({ bookings, onEditBooking }) => {
    const handleEdit = (id) => {
        const bookingToEdit = bookings.find(booking => booking.id === id);
        if (bookingToEdit) {
            onEditBooking(bookingToEdit);
        }
    };



    return (
        <Grid container spacing={2} sx={{ mt: 2, width: '100%', margin: 'auto' }}>
            {bookings?.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                    <Card
                        sx={{
                            p: 2,
                            display: 'flex',
                            borderLeft: '5px solid #e7c664',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pr: { xs: 0, sm: 2 },
                                pb: { xs: 2, sm: 0 },
                                borderRight: { xs: 'none', sm: '1px solid #e0e0e0' },
                                borderBottom: { xs: '1px solid #e0e0e0', sm: 'none' },
                                mr: { xs: 0, sm: 2 },
                                mb: { xs: 2, sm: 0 },
                                minWidth: { xs: '100%', sm: '120px' },
                            }}
                        >

                            <Chip
                                label={booking.type}
                                size="small"
                                color={booking.type === 'Express' ? 'error' : 'primary'}
                                sx={{ mt: 1, fontWeight: 'bold' }}
                            />
                        </Box>


                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: { xs: '100%', sm: 'auto' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Icon icon="mdi:map-marker-outline" width="20" height="20" color="#e7c664" />
                                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                    Pickup:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {booking.pickup}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: '4px' }}>
                                <Box
                                    sx={{
                                        height: '20px',
                                        borderLeft: '1px dashed #bdbdbd',
                                        position: 'relative',
                                        left: '5.5px',
                                        top: '2px',
                                        mr: '22px',
                                    }}
                                />
                                <Icon icon="mdi:arrow-down" width="20" height="20" color="#e7c664" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Icon icon="mdi:map-marker-check-outline" width="20" height="20" color="#e7c664" />
                                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                    Delivery:
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {booking.delivery}
                                </Typography>
                            </Box>
                        </Box>


                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                ml: { xs: 0, sm: 2 },
                                mt: { xs: 2, sm: 0 },
                                minWidth: { xs: '100%', sm: '250px' },
                                borderTop: { xs: '1px solid #e0e0e0', sm: 'none' },
                                pt: { xs: 2, sm: 0 },
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>Pickup Address:</Typography> {booking.pickupaddress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>Delivery Address:</Typography> {booking.deliveryaddress}
                            </Typography>
                            <Box sx={{ mt: 1, textAlign: { xs: 'left', sm: 'right' } }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleEdit(booking.id)}
                                    sx={{ textTransform: 'none', borderColor: "#e7c664", color: "black" }}
                                >
                                    Change Address
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ListBooking;