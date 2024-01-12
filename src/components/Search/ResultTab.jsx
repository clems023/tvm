import { Download, Payments } from "@mui/icons-material";
import { Backdrop, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, OutlinedInput, Select, Tab, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

const ResultTab = ({ plaque, name, firstname, chassis, description, data }) => {

    const [paymentDetails, setPaymentDetails] = useState({});
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = (item) => {
        setPaymentDetails(item)
        setOpen(true);
        setLoading(false);
        setConfirmationModal(false);

    };

    const handleValidation = () => {

        handleClose()
        setLoading(true); // Activez le loader

        // Simulez une attente de 3 secondes avec setTimeout
        setTimeout(() => {
            setLoading(false); // Désactivez le loader après 3 secondes
            setConfirmationModal(true); // Activez le modal de confirmation après 3 secondes
        }, 3000);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [phone, setPhone] = useState("");

    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    const getImageSource = () => {
        const phoneNumber = phone.replace(/[^0-9]/g, ''); // Supprime tous les caractères non numériques
        const numericPrefix = phoneNumber.slice(0, 5);


        // Condition pour déterminer quelle image afficher en fonction du préfixe numérique
        if (numericPrefix >= '22890' && numericPrefix <= '22893') {
            return "../../../public/images/tmoney.png";
        } else if (numericPrefix >= '22896' && numericPrefix <= '22899') {
            return "../../../public/images/flooz.png";
        } else {
            return "../../../public/images/mobile money.jpg";
        }
    }

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label={<Typography variant="body1" fontWeight={"bold"}>À payer</Typography>} />
                <Tab label={<Typography variant="body1" fontWeight={"bold"}>Historique</Typography>} />
            </Tabs>
            {/* Contenu de l'onglet A payer */}
            {value === 0 &&
                <Box p={3} sx={{ backgroundColor: "#f3f4f7" }}>
                    {data.map((item, index) => (
                        item.state === 0 && (
                            <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                                <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h5">Déclaration <Typography variant="body2">{item.refDeclaration}</Typography></Typography>
                                    <Typography variant="h6" color={"#10487c"}>{item.exerciceFiscal}</Typography>
                                </Box>
                                <Divider sx={{ height: "2px" }} />
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", p: 2 }}>
                                    <TableContainer>
                                        <TableBody>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>TVM :</Typography></TableCell>
                                                <TableCell><Typography variant="body2">{item.montant} Fcfa</Typography></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Pénalité :</Typography></TableCell>
                                                <TableCell><Typography variant="body2">{item.montant_penalite} Fcfa</Typography></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Total à payer :</Typography></TableCell>
                                                <TableCell><Typography variant="h6" fontWeight={"bold"}>{item.montant + item.montant_penalite} Fcfa</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </TableContainer>
                                    <Button variant="contained" size="large" sx={{ backgroundColor: "#10487c" }} startIcon={<Payments />} onClick={() => handleClickOpen(item)}>Payer</Button>
                                </Box>
                            </Card>
                        )
                    ))}
                </Box>}
            {/* Contenu de l'onglet Historique */}
            {value === 1 &&
                <Box p={3} sx={{ backgroundColor: "#f3f4f7" }}>
                    {data.map((item, index) => (
                        item.state === 1 && (
                            <Card key={index} variant="outlined">
                                <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h5">Déclaration {item.exerciceFiscal}</Typography>
                                    <Typography variant="h6" color={"#10487c"}>{item.dateDeclaration}</Typography>
                                </Box>
                                <Divider sx={{ height: "2px" }} />
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", p: 2 }}>
                                    <TableContainer>
                                        <TableBody>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>TVM :</Typography></TableCell>
                                                <TableCell><Typography variant="body2">{item.montant} Fcfa</Typography></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Pénalité :</Typography></TableCell>
                                                <TableCell><Typography variant="body2">{item.montant_penalite} Fcfa</Typography></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Paiement :</Typography></TableCell>
                                                <TableCell><Typography variant="body2" fontWeight={"bold"}>{item.refPayment} du {item.datePayment}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow sx={{ "& td": { border: 0 } }}>
                                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Payé :</Typography></TableCell>
                                                <TableCell><Typography variant="h6" fontWeight={"bold"}>{item.montant + item.montant_penalite} Fcfa</Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </TableContainer>
                                    <Button variant="contained" size="large" sx={{ backgroundColor: "#10487c" }} startIcon={<Download />}>
                                        Télécharger
                                    </Button>
                                </Box>
                            </Card>
                        )
                    ))}
                </Box>}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><Typography variant="h6" fontWeight={"bold"}>Détails du paiement</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText mb={3}>
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Plaque :</Typography> {plaque}<br />
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Nom :</Typography> {name}<br />
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Prénom :</Typography> {firstname}<br />
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Châssis :</Typography> {chassis}<br />
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Description :</Typography> {description}<br />
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>Somme à payer :</Typography>  {paymentDetails.montant + paymentDetails.montant_penalite} Fcfa<br />
                    </DialogContentText>
                    <Box sx={{ textAlign: 'center' }}>
                        <img src={getImageSource()} alt="Tmoney" style={{ maxWidth: '25%', height: 'auto' }} />
                    </Box>
                    <FormControl sx={{ m: 1, width: '100%', textAlign: 'center' }}>
                        <MuiTelInput defaultCountry="TG" variant="outlined" label="Téléphone" onChange={handlePhoneChange} value={phone} />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button variant="contained" onClick={handleValidation} sx={{ backgroundColor: "#10487c" }}>Valider</Button>
                </DialogActions>
            </Dialog>

            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            <Dialog
                open={confirmationModal}
                onClose={() => setConfirmationModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box p={2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Une demande de confirmation vous a été envoyée sur votre téléphone. Veuillez l'accepter.
                    </Typography>

                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={() => setConfirmationModal(false)} sx={{ backgroundColor: "#10487C" }}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}

export default ResultTab