import { useState } from 'react';
import { AppBar, Avatar, Box, CssBaseline, Divider, Grid, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import Logo from '../../../public/images/logo (1).png';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { History } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [searchSuccess, setSearchSuccess] = useState(false)
    const [searchData, setSearchData] = useState([
        {
            "state": 1,
            "exerciceFiscal": "2023",
            "refDeclaration": "REF2023-001",
            "dateDeclaration": "2023-01-15",
            "modePaiement": "Carte bancaire",
            "refPayment": "PAY2023-001",
            "datePayment": "2023-01-20",
            "montant": 12000,
            "montant_penalite": 1200
        },
        {
            "state": 0,
            "exerciceFiscal": "2022",
            "refDeclaration": "",
            "dateDeclaration": "",
            "modePaiement": "",
            "refPayment": "",
            "datePayment": "",
            "montant": 10000,
            "montant_penalite": 1000
        },
        {
            "state": 1,
            "exerciceFiscal": "2021",
            "refDeclaration": "REF2021-002",
            "dateDeclaration": "2021-02-10",
            "modePaiement": "Virement bancaire",
            "refPayment": "PAY2021-002",
            "datePayment": "2021-02-15",
            "montant": 11000,
            "montant_penalite": 1100
        },
        {
            "state": 0,
            "exerciceFiscal": "2020",
            "refDeclaration": "",
            "dateDeclaration": "",
            "modePaiement": "",
            "refPayment": "",
            "datePayment": "",
            "montant": 20000,
            "montant_penalite": 2000
        }
    ])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchSuccess = (data) => {
        setSearchSuccess(true);
        setSearchData(data);
    };

    const handleSearchReset = () => {
        setSearchSuccess(false);
        setSearchData(null);
    };

    const logout = async () => {
        // Récupérer le token d'accès depuis le localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Vérifier si le token d'accès existe avant de faire la demande de déconnexion
        if (accessToken) {
            try {
                // Envoyer une demande de déconnexion avec le token d'accès
                const response = await fetch('https://tvmapi-imptax.otr.tg:7443/api/logout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // Vérifier la réussite de la demande
                if (response.ok) {
                    // Effacer le token d'accès du localStorage
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('tokenType');

                    console.log('Déconnexion réussie');
                    navigate("/");
                } else {
                    // Gérer les erreurs de déconnexion
                    console.error('Erreur lors de la déconnexion');
                    console.log(response);
                }
            } catch (error) {
                console.error('Erreur lors de la déconnexion', error);
            }
        }
    };

    return (
        <>
            <Grid contain component="main" minHeight="100vh">
                <CssBaseline />
                <AppBar position="sticky" sx={{ backgroundColor: 'white' }} elevation={3}>
                    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box
                            component="img"
                            sx={{
                                width: { xs: '25%', sm: '20%', md: '5%' },
                            }}
                            src={Logo}
                        />
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar /> Profil
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon><History /></ListItemIcon>
                                Historique
                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Se déconnecter
                            </MenuItem>
                        </Menu>
                    </Toolbar >
                </AppBar >
                {searchSuccess ? (
                    <SearchResults searchData={searchData} onSearchReset={handleSearchReset} />
                ) : (
                    <SearchInput onSearchSuccess={handleSearchSuccess} />
                )}

            </Grid>

        </>
    );
};

export default Search;