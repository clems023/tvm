/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { useState } from 'react'

const PhoneNumber = (props) => {
    const [phone, setPhone] = useState()
    const [phoneError, setPhoneError] = useState('')

    const phoneChangeHandler = (newValue) => {
        setPhone(newValue)
        setPhoneError('')
    }

    const sendOtpRequest = async (phoneNumber) => {
        try {
            const response = await fetch(`https://tvmapi-imptax.otr.tg:7443/api/sendOtp/${phoneNumber}`);
            const data = await response.json();

            console.log(data);

            if (data && data.success) {
                props.addHandler(phone);
                props.phoneLiftUp(phone);
            } else {
                setPhoneError('Une erreur s\'est produite lors de l\'envoi du numéro de téléphone.');
            }
        } catch (error) {
            console.error('Error:', error);
            setPhoneError('Une erreur s\'est produite lors de la communication avec le serveur.');
        }
    };

    const phoneSubmitHandler = async (event) => {
        event.preventDefault()

        if (!phone) {
            setPhoneError('Veuillez saisir votre numéro de téléphone.');
        }
        await sendOtpRequest(phone);

    }

    return (

        <Box>

            <Box component="form" onSubmit={phoneSubmitHandler} autoComplete='off' noValidate sx={{ pt: 2 }}>


                <MuiTelInput
                    variant='outlined'
                    id="phone-number"
                    label="Téléphone"
                    size="small"
                    value={phone}
                    onChange={phoneChangeHandler}
                    defaultCountry="TG"
                    fullWidth
                    error={!!phoneError}
                    helperText={phoneError}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 9, backgroundColor: '#104679' }}
                >
                    Suivant
                </Button>
            </Box>
        </Box>
    )
}

export default PhoneNumber