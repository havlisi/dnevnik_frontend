import { Card, Grid, CardContent, CardHeader, Container, Typography, Button, Box } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";

const SubjectDetails = () => {
    const subject = useLoaderData();
    const navigate = useNavigate();

    return <Container sx={{width:'65%'}}>
        <Typography 
            sx={{
                textAlign:'left',
                color: '#E01E9B',
                fontSize: '1.5em',
                marginBottom: '15px'
            }}>
            Detaljnije informacije predmeta
        </Typography>
        <br/>
        <Card variant="outlined" sx={{
            marginBottom: 1,
            border: '1px solid #E01E9B',
            fontFamily: "RobotoL", 
            fontWeight: "bold",
            lineHeight: "1.7",
            backgroundColor: "rgba(232, 225, 205, 0.396)",
            backdropFilter: "blur(10px)",
            color: "#E01E9B",
            borderRadius: "0px 0px 9px 9px",
            '&.MuiCard-root': {
                border: '1px solid #E01E9B',
                borderRadius: '10px',
            },
        }}>
        <CardHeader
            sx={{ 
                display: "flex", 
                textAlign: "center",
                color: "white",
                borderRadius: "9px 9px 0px 0px",
                fontSize: "1.3em",
                backgroundColor: "rgba(195, 23, 135, 0.75)",
                padding: "7% 0%",
                height:'40px'
            }}
            title={subject.subjectName}
        />
        <CardContent
            sx={{
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
        <Grid container spacing={0.5} item xs={12} alignItems='center' justifyContent='space-between' 
            sx={{
                textAlign: 'left',
                padding: '15px 20px 10px 20px'
            }}>
            <Grid item xs={12}>
                ID predmeta: {subject.ID}
            </Grid>
            <Grid item xs={12}>
                Fond časova: {subject.fondCasova}
            </Grid>
            <Typography sx={{
                marginTop: '10px',
                fontSize: '1em',
                textAlign: 'left',
                paddingLeft: '4px',
                color: '#E01E9B'
            }}>
                Osnovne informacije: <br/>
                Lorem ipsum dolor sit amet, consectetur adi piscing elit, 
                sed magna aliqua sequete.
            </Typography>
        </Grid>
        </CardContent>
        </Card>
        <Box sx={{marginTop:'10px', alignItems:'center', textAlign:'center'}}>
            <Button onClick={() => navigate('/subjects')}
                sx={{color:'#E01E9B'}}>
                Nazad
            </Button>
        </Box>
    </Container>
}

export default SubjectDetails;