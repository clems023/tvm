import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input';
import { MobileStepper } from '@mui/material';

const steps = ['Numéro de téléphone', 'Code Pin', 'Valider'];

export default function Payment() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [pinCode, setPinCode] = React.useState('');


    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setPhoneNumber('');
        setPinCode('');
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <MuiTelInput
                        label="Numéro de téléphone"
                        defaultCountry='TG'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                );
            case 1:
                return (
                    <TextField
                        label="Code Pin"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                );
            case 2:
                return (
                    <>
                        <Typography>Numéro de téléphone: {phoneNumber}</Typography>
                        <Typography>Immatriculation: 2323 BG</Typography>
                        <Typography>Véhicule: Toyota</Typography>
                    </>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MobileStepper
                variant="dots"
                steps={steps.length}
                position="static"
                activeStep={activeStep}
                sx={{ pb: 2 }}
            />
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant='contained' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                </Button>
            </Box>
        </Box>
    );
}
