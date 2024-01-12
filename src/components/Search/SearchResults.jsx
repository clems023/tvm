import { Box, Card, CardContent, CardHeader, Divider, Grid, List, ListItem, ListItemText, Paper, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import ResultTab from "./ResultTab";

const SearchResults = ({ searchData, onSearchReset }) => {

    console.log(searchData.data);

    const data = searchData.data

    const plateInfo = {
        plateNumber: "2332BD",
        make: "Toyota",
        nom: "ABAXX",
        prenom: "XXMI",
        chassis: "JTDEXXXXXXXXXX6767",
        description: "Puissance Fiscale entre 8 - 11 CV"
    };

    return (
        <Grid p={4}>
            <Card sx={{ mb: 4 }} variant="outlined">
                <CardHeader title={<Typography fontWeight={"bold"} variant="h5">Infomations générales</Typography>} />
                <Divider sx={{ height: "2px" }} />
                <CardContent>
                    <TableContainer>
                        <TableBody>
                            <TableRow sx={{ "& td": { border: 0 } }}>
                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Plaque :</Typography></TableCell>
                                <TableCell><Typography variant="body2">{data.plaque}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "& td": { border: 0 } }}>
                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Nom :</Typography></TableCell>
                                <TableCell><Typography variant="body2">{data.nom}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "& td": { border: 0 } }}>
                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Prénom :</Typography></TableCell>
                                <TableCell><Typography variant="body2">{data.prenom}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "& td": { border: 0 } }}>
                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Châssis :</Typography></TableCell>
                                <TableCell><Typography variant="body2">{data.numeroChassis}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "& td": { border: 0 } }}>
                                <TableCell><Typography variant="body1" color={"#10487c"} fontWeight={"bold"}>Description :</Typography></TableCell>
                                <TableCell><Typography variant="body2">{data.tvmDescription}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </TableContainer>
                </CardContent>
            </Card>

            <ResultTab plaque={data.plaque} name={data.nom} firstname={data.prenom} chassis={data.numeroChassis} description={data.tvmDescription} data={data.detailsMontant} />
        </Grid >
    )
}

export default SearchResults