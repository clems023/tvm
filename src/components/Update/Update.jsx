import { Alert, AppBar, Avatar, Box, Button, CircularProgress, CssBaseline, Grid, IconButton, Paper, Snackbar, TextField, Toolbar, Typography } from "@mui/material"
import Logo from "../../../public/images/logo (1).png"
import TvmLogo from "../../../public/images/tvm_logo.png"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Update = () => {
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const validationSchema = yup.object({
        nif: yup.string().required("Le NIF est requis"),
        nom: yup.string().required("Le Nom est requis"),
        prenom: yup.string().required("Le Prénom est requis"),
        email: yup.string().email("Format d'email invalide").required("L'email est requis"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Token non trouvé');
                return;
            }

            const response = await fetch('https://tvmapi-imptax.otr.tg:7443/api/update_profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Si la mise à jour réussit, vous pouvez effectuer des actions supplémentaires ici
                console.log('Profil mis à jour avec succès');
                setTimeout(() => {
                    setLoading(false);
                    setSnackbarMessage("Informations mises à jour");
                    setSnackbarOpen(true);

                    // Attendre 2 secondes avant de naviguer vers la page suivante
                    setTimeout(() => {
                        // Naviguer vers la page suivante (à ajuster en fonction de vos besoins)
                        navigate('/search');
                    }, 2000);
                }, 2500)
            } else {
                console.error('Échec de la mise à jour du profil');
                const errorData = await response.json();
                setLoading(false);
                console.error('Message d\'erreur:', errorData.message);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
        }
    };


    return (
        <>
            <CssBaseline />
            <Grid container component="main" sx={{ alignItems: "center" }}>


                <AppBar position="sticky" sx={{ backgroundColor: "white" }} elevation={3}>
                    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box
                            component="img"
                            sx={{
                                width: { xs: '25%', sm: '20%', md: '5%' },
                            }}
                            src={Logo}
                        />
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Toolbar >
                </AppBar >


                <Grid container item md={7} display={{ sm: "none", xs: "none", md: "flex" }} justifyContent={"center"}> <img src="../../../public/images/Completed steps-bro.png" style={{ maxHeight: "70vh" }} /></Grid>

                <Grid
                    md={5}
                    xs={12}
                    sm={12}
                    sx={{ minHeight: '100vh' }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    container item
                    elevation={6}
                    direction={"column"}
                >
                    <Box
                        component={Paper}
                        borderRadius={4}
                        elevation={8}
                        p={3}
                        maxWidth={{
                            xs: "85%",
                            md: "60%",
                            lg: "60%"
                        }}
                        textAlign={"center"}>

                        <img src={TvmLogo} alt="image-" style={{ width: '50%', margin: "auto" }} />

                        <Typography component="h1" variant="h4" align="center">
                            Informations additionnelles
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3} mt={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={8} md={8}>
                                            <TextField
                                                {...register("nif")}
                                                required
                                                id="nif"
                                                name="nif"
                                                size="small"
                                                label="NIF"
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.nif}
                                                helperText={errors.nif?.message}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={4} md={4}>
                                            <Button variant="contained" fullWidth href="https://nif.otr.tg/create" sx={{ backgroundColor: '#104679', fontWeight: "bold" }}>
                                                Créer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register("nom")}
                                        required
                                        id="nom"
                                        name="nom"
                                        label="Nom"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={!!errors.nom}
                                        helperText={errors.nom?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register("prenom")}
                                        required
                                        id="prenom"
                                        name="prenom"
                                        label="Prénom"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={!!errors.prenom}
                                        helperText={errors.prenom?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register("email")}
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} textAlign="center" mt={3}>
                                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#104679', fontWeight: "bold" }} disabled={loading}>
                                        Mettre à jour
                                        {loading && <CircularProgress size={24} sx={{ marginLeft: 1 }} />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        >
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={handleCloseSnackbar}
                                severity="success"
                            >
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </Box>
                </Grid>
            </Grid>
        </>)
}

export default Update