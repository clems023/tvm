import { AppBar, Box, CssBaseline, Grid, Paper } from "@mui/material"
import Logo from "../../../public/images/logo (1).png"
import TvmLogo from "../../../public/images/tvm_logo.png"
import PhoneNumber from "../PhoneCard/PhoneNumber"
import OtpConfirmation from "../PhoneCard/OtpConfirmation"
import { useState } from "react"
const WelcomePage = () => {

    const [isOtpConfirmed, setIsConfirmed] = useState(false)
    const [phone, setPhone] = useState('+228 99 99 99 99')
    const [users, setUsers] = useState([])

    const confirm = (phoneNumber) => {
        setIsConfirmed(true)
    }
    return (
        <>
            <CssBaseline />
            <Paper sx={{ minHeight: "80vh" }}>
                <Grid
                    container
                    component="main"
                    sx={{
                        minHeight: '100%',
                        alignItems: "center"
                    }}>
                    <Grid
                        container
                        item md={7}
                        display={{ sm: "none", xs: "none", md: "flex" }}
                        justifyContent={"center"}>
                        <img
                            src="../../../public/images/welcome_image_ui_2.png"
                            style={{ maxHeight: "70vh" }}
                        />
                    </Grid>

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
                            {isOtpConfirmed ? <OtpConfirmation phone={phone} /> : <PhoneNumber addHandler={confirm} phoneLiftUp={setPhone} />}
                        </Box>
                    </Grid>
                </Grid >
            </Paper>
        </>
    )
}
export default WelcomePage