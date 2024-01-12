import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import SearchImage from '../../../public/images/Search-rafiki.png'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useState } from 'react';

const SearchInput = ({ onSearchSuccess }) => {

    const [plate, setPlate] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');


    const validateChar = (char, index) => {
        // Vérifier si l'entrée est dans la plage des quatre premières cases
        if (index < 4 && !isNaN(char)) {
            return true;
        }
        // Vérifier si l'entrée est dans la plage des deux dernières cases
        else if (index >= 4 && /[A-Z]/.test(char)) {
            return true;
        }
        return false;
    };

    const handleSearch = async () => {
        try {

            setLoading(true)

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Token non trouvé');
                return;
            }
            // Effectuer la recherche d'informations sur l'API avec le numéro de plaque
            const response = await fetch(`https://tvmapi-imptax.otr.tg:7443/api/find_vehicle_by_plate/${plate}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Recherche réussie');
                const vehicleData = await response.json();
                console.log('Données du véhicule:', vehicleData);
                onSearchSuccess(vehicleData)
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                console.error('Erreur lors de la recherche:', errorData.message);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box width="100vw" p={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="img" src={SearchImage} alt="tvm-logo" sx={{ width: { md: '20%', sm: '50%', xs: '70%' } }} />

            <Grid container mt={1} spacing={2} alignItems="center" justifyContent="center" sx={{ maxWidth: '400px' }}>

                <Typography fontWeight={"bold"} variant='h6'> Veuillez entrer le numéro de plaque</Typography>

                <Grid item xs={12}>
                    <MuiOtpInput length={6} mt={2} sx={{ display: 'flex', gap: '5px', width: '100%' }} value={plate} validateChar={validateChar} onChange={(value) => setPlate(value)} />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center', mx: 'auto' }}>
                    <Button variant="contained" size="large" sx={{ mt: 2, width: '100%', backgroundColor: '#104679' }} onClick={handleSearch} disabled={loading}>
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Recherche'
                        )}
                    </Button>
                </Grid>

                {error && (
                    <Grid item xs={12} sx={{ textAlign: 'center', mx: 'auto' }}>
                        <Typography color="error" mt={2}>
                            {error}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default SearchInput