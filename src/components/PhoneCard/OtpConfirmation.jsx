/* eslint-disable react/prop-types */
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
const OtpConfirmation = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showError, setShowError] = useState(false);

    console.log(props.phone)

    const handleChange = (newValue) => {
        const inputVal = newValue;
        if (/^\d{0,4}$/.test(inputVal)) {
            setOtp(inputVal);
            setShowError(false);
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const handleLogin = async (event) => {
        event.preventDefault()

        if (!otp) {
            setShowError(true);
            return;
        }

        const data = {
            phone: props.phone,
            otp: otp
        };

        try {
            // Envoyer la requête à l'API pour la confirmation OTP
            const response = await fetch('https://tvmapi-imptax.otr.tg:7443/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            console.log(result);

            if (result.success) {
                // Si la confirmation réussit, effectuer des actions supplémentaires ici
                console.log('OTP Confirmé avec succès');
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('tokenType', result.data.type);

                const userResponse = await fetch('https://tvmapi-imptax.otr.tg:7443/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${result.data.type} ${result.data.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const userData = await userResponse.json();

                console.log(userData);

                if (userData.data.email !== null && userData.data.name !== null) {
                    navigate("/search")
                }
                // Naviguer vers la page suivante
                navigate('/update');
            } else {
                // Si la confirmation échoue, afficher un message d'erreur
                setSnackbarMessage('Mauvais OTP. La confirmation a échoué.');
                setSnackbarOpen(true);
                console.error('Échec de la confirmation de l\'OTP');
            }
        } catch (error) {
            console.error('Erreur lors de la confirmation de l\'OTP:', error);
        }
    };

    return (
        <Box>
            <Box>
                <Typography mt={"20px"} color={"#5a5f63"} >Veuillez rentrer le code à 4 chiffres qui vous a été envoyé sur le {props.phone} pour vous connecter</Typography>
            </Box>
            <Box component="form" noValidate autoComplete='off' sx={{ mt: 2 }} display="flex" flexDirection="column" alignItems={"center"} onSubmit={handleLogin}>
                <MuiOtpInput
                    label="Code OTP"
                    id="otp"
                    size="small"
                    value={otp}
                    onChange={handleChange}
                    sx={{ maxWidth: "500px" }}
                />

                {/* Afficher le message d'erreur si l'OTP est vide */}
                {showError && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        Veuillez rentrer l'OTP avant de soumettre le formulaire.
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#104679' }}
                >
                    Se connecter
                </Button>

                <Typography color={"#5a5f63"}>Vous n'avez pas reçu de code à 4 chiffres ? <Link>Renvoyez le code</Link> </Typography>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                ><Alert severity='error'>{snackbarMessage}</Alert></Snackbar>
            </Box>
        </Box>
    )
}

export default OtpConfirmation