import React, { useState } from 'react';
import {
    Box, Button, Dialog, DialogTitle, DialogContent,
    Stack, Typography, TextField, Select, MenuItem,
    FormControl, Paper, InputLabel
} from '@mui/material';
import { Icon } from '@iconify/react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ListBooking from './components/index';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const generateTimeSlots = () => {
    const slots = [];


    const formatTime = (hour) => {
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
    };


    slots.push("6 AM - 8 AM");
    slots.push("8 AM - 10 AM");


    for (let i = 10; i < 24; i += 2) {
        const startHour = formatTime(i);
        const endHour = formatTime(i + 2);
        slots.push(`${startHour} - ${endHour}`);
    }
    return slots;
};

const timeSlots = generateTimeSlots();

const initialDummyBookings = [
    {
        id: 1,
        type: 'Regular',
        pickup: '2025-06-01 08:00 - 10:00',
        delivery: '2025-06-02 10:00 - 12:00',
        pickupaddress: '123 Main Street, Anytown, USA',
        deliveryaddress: '456 Main Street, Anytown, USA',
        date: '10 November',
    }
];

const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    pickupDate: Yup.date().required('Required'),
    pickupTime: Yup.string().required('Required'),
    pickupAddress: Yup.string().required('Required'),
    deliveryDate: Yup.date().required('Required'),
    deliveryTime: Yup.string().required('Required'),
    deliveryAddress: Yup.string().required('Required'),
});

const Book = ({ ref }) => {
    const [bookings, setBookings] = useState(initialDummyBookings);
    const [open, setOpen] = useState(false);
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        type: '',
        pickupDate: null,
        pickupTime: '',
        pickupAddress: '',
        deliveryDate: null,
        deliveryTime: '',
        deliveryAddress: '',
    });

    const disablePastDates = (current) => current && current < dayjs().startOf('day');

    const getDeliveryDisabledDate = (pickupDate, pickupTime, type) => (currentDeliveryDate) => {
        if (!pickupDate || !pickupTime) return true;

        const [pickupStartHour] = pickupTime.split(' ')[0].split(':').map(Number);
        const pickupDateTime = dayjs(pickupDate).hour(pickupStartHour);

        const diffInHours = dayjs(currentDeliveryDate).diff(pickupDateTime, 'hour');

        if (type === 'Regular') {
            return diffInHours < 24;
        }
        if (type === 'Express') {
            return diffInHours < 12;
        }
        return true;
    };

    const handleDialogOpen = () => {
        setEditingBookingId(null);
        setInitialValues({
            type: '',
            pickupDate: null,
            pickupTime: '',
            pickupAddress: '',
            deliveryDate: null,
            deliveryTime: '',
            deliveryAddress: '',
        });
        setOpen(true);
    };

    const handleEditBooking = (booking) => {
        const pickupParts = booking.pickup.split(' ');
        const deliveryParts = booking.delivery.split(' ');

        const pickupDate = pickupParts[0];
        const pickupTime = pickupParts.slice(1).join(' ');

        const deliveryDate = deliveryParts[0];
        const deliveryTime = deliveryParts.slice(1).join(' ');

        setInitialValues({
            type: booking.type,
            pickupDate: dayjs(pickupDate),
            pickupTime: pickupTime,
            pickupAddress: booking.pickupaddress,
            deliveryDate: dayjs(deliveryDate),
            deliveryTime: deliveryTime,
            deliveryAddress: booking.deliveryaddress,
        });

        setEditingBookingId(booking.id);
        setOpen(true);
    };

    const handleSubmit = (values) => {
        const newBooking = {
            id: editingBookingId || Date.now(),
            type: values.type,
            pickup: values.pickupDate.format('YYYY-MM-DD') + ' ' + values.pickupTime,
            delivery: values.deliveryDate.format('YYYY-MM-DD') + ' ' + values.deliveryTime,
            pickupaddress: values.pickupAddress,
            deliveryaddress: values.deliveryAddress,
            date: values.pickupDate.format('DD MMMM'),
        };

        if (editingBookingId) {
            setBookings(prev => prev.map(b => b.id === editingBookingId ? newBooking : b));
        } else {
            setBookings(prev => [...prev, newBooking]);
        }

        setOpen(false);
    };

    // Responsive settings for the carousel
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4, // Show 4 items on large desktops
            slidesToSlide: 2, // Slide 2 items at a time
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3, // Show 3 items on desktops
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2, // Show 2 items on tablets
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1, // Show 1 item on mobile
            slidesToSlide: 1,
        },
    };


    const renderTimeSlotsCarousel = (selected, setFieldValue, name) => (
        <Carousel
            responsive={responsive}
            infinite={false}
            arrows={true}
            showDots={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-20-px"
        >
            {timeSlots.map((slot, i) => (
                <Box key={i} sx={{ padding: '0 8px' }}>
                    <Button
                        fullWidth
                        variant={selected === slot ? 'contained' : 'outlined'}
                        onClick={() => setFieldValue(name, slot)}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: selected === slot ? '#FFD700' : 'transparent',
                            color: selected === slot ? '#000' : '#555',
                            borderColor: '#FFD700',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#ffcc00',
                                borderColor: '#ffcc00',
                            },
                        }}
                    >
                        {slot}
                    </Button>
                </Box>
            ))}
        </Carousel>
    );

    return (
        <>
            <Box id={ref} sx={{ padding: '10px', margin: '10px' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" color="#fff">Schedule Date</Typography>
                    <Button onClick={handleDialogOpen} sx={{ color: 'black', backgroundColor: "#e7c664", }}>
                        Add Address
                    </Button>
                </Stack>

                <Box sx={{ mt: 2 }}>
                    <ListBooking bookings={bookings} onEditBooking={handleEditBooking} />
                </Box>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{editingBookingId ? 'Edit Booking' : 'Add Booking'}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, errors, touched }) => (
                            <Form>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                            <Icon icon="mdi:truck-fast" fontSize={24} />
                                            <Typography variant="h6">Pickup Details</Typography>
                                        </Stack>

                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                name="type"
                                                value={values.type}
                                                onChange={(e) => {
                                                    setFieldValue("type", e.target.value);
                                                    setFieldValue("deliveryDate", null);
                                                    setFieldValue("deliveryTime", '');
                                                }}
                                            >
                                                <MenuItem value="Regular">Regular</MenuItem>
                                                <MenuItem value="Express">Express</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Box sx={{ mb: 2 }}>
                                            <Typography fontWeight="bold" mb={1}>Pickup Date</Typography>
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                disabledDate={disablePastDates}
                                                value={values.pickupDate}
                                                onChange={(date) => {
                                                    setFieldValue('pickupDate', date);
                                                    setFieldValue('deliveryDate', null);
                                                    setFieldValue('deliveryTime', '');
                                                }}
                                            />
                                        </Box>

                                        <Typography fontWeight="bold" mb={1}>Pickup Time</Typography>
                                        {renderTimeSlotsCarousel(values.pickupTime, setFieldValue, 'pickupTime')}

                                        <TextField
                                            fullWidth
                                            label="Pickup Address"
                                            sx={{ mt: 2 }}
                                            name="pickupAddress"
                                            value={values.pickupAddress}
                                            onChange={(e) => setFieldValue("pickupAddress", e.target.value)}
                                            error={touched.pickupAddress && !!errors.pickupAddress}
                                            helperText={touched.pickupAddress && errors.pickupAddress}
                                        />
                                    </Paper>

                                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
                                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                            <Icon icon="mdi:map-marker-radius" fontSize={24} />
                                            <Typography variant="h6">Delivery Details</Typography>
                                        </Stack>

                                        {values.type && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography fontWeight="bold" mb={1}>Delivery Date</Typography>
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    disabledDate={getDeliveryDisabledDate(values.pickupDate, values.pickupTime, values.type)}
                                                    value={values.deliveryDate}
                                                    onChange={(date) => setFieldValue('deliveryDate', date)}
                                                />
                                            </Box>
                                        )}

                                        <Typography fontWeight="bold" mb={1}>Delivery Time</Typography>

                                        {renderTimeSlotsCarousel(values.deliveryTime, setFieldValue, 'deliveryTime')}

                                        <TextField
                                            fullWidth
                                            label="Delivery Address"
                                            sx={{ mt: 2 }}
                                            name="deliveryAddress"
                                            value={values.deliveryAddress}
                                            onChange={(e) => setFieldValue("deliveryAddress", e.target.value)}
                                            error={touched.deliveryAddress && !!errors.deliveryAddress}
                                            helperText={touched.deliveryAddress && errors.deliveryAddress}
                                        />
                                    </Paper>
                                </Stack>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 4, backgroundColor: '#e7c664', color: '#000' }}
                                >
                                    {editingBookingId ? 'Update Booking' : 'Book Now'}
                                </Button>
                                <Button sx={{ mt: 4, borderColor: '#e7c664', color: '#000' }} fullWidth variant="outlined" onClick={() => setOpen(false)} >Cancel</Button>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Book;