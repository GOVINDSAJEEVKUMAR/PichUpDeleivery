import React from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorConnector = styled(StepConnector)(({ theme }) => ({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& .MuiStepConnector-line': {
            backgroundColor: '#facc15',
        },
    },
    completed: {
        '& .MuiStepConnector-line': {
            backgroundColor: '#facc15',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#e5e7eb',
        borderRadius: 1,
    },
}));


const steps = ['Estimate', 'Details', 'Payment'];

const ProgressBar = ({ activeStep = 1 }) => {
    return (
        <Box sx={{ width: '100%', height: '80px', backgroundColor: '#fff', mt: '10px', p: '5px' }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<ColorConnector />}
                sx={{ mt: 1 }}
            >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconProps={{
                                sx: {
                                    '&.Mui-completed': {
                                        color: '#facc15', // yellow
                                    },
                                    '&.Mui-active': {
                                        color: '#facc15',
                                    },
                                },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ProgressBar;
