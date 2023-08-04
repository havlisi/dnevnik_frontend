import { Card, Grid, CardContent, CardHeader, Container, Typography, Button, Box } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";

const StudentDetails = () => {
    const student = useLoaderData();
    const navigate = useNavigate();

    return <Container sx={{width:'65%'}}>
        <Typography 
            sx={{
                textAlign:'left',
                color: '#418258',
                fontSize: '1.5em',
                marginBottom: '10px'
            }}>
            Detaljnije informacije studenta 
        </Typography>
        <br/>
        <Card variant="outlined" sx={{
            marginBottom: 1,
            border: '1px solid #6bb187',
            fontFamily: "RobotoL", 
            fontWeight: "bold",
            lineHeight: "1.7",
            backgroundColor: "rgba(233, 240, 199, 0.396)",
            backdropFilter: "blur(10px)",
            color: "#418258",
            borderRadius: "0px 0px 9px 9px",
            '&.MuiCard-root': {
                border: '1px solid #6bb187',
                borderRadius: '10px',
            },
        }}>
        <CardHeader
            sx={{ 
                display: "flex", 
                textAlign: "center",
                color: "white",
                borderRadius: "9px 9px 0px 0px",
                fontSize: "1.5em",
                backgroundColor: "#6bb187",
                padding: "7% 0%",
                height:'40px'
            }}
            subheader={
                <Typography style={{
                    color: "white",
                    fontSize: "1.1em"
                }}>
                  {student.firstName} {student.lastName}
                </Typography>
              }
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
                        ID učenika: {student.ID}
                    </Grid>
                    <Grid item xs={12}>
                        Korisničko ime: {student.username}
                    </Grid>
                    <Grid item xs={12}>
                        E-mail: {student.email}
                    </Grid>
                </Grid>
        </CardContent>
        </Card>
        <Box sx={{marginTop:'10px', alignItems:'center', textAlign:'center'}}>
            <Button sx= {{color: "#418258"}} onClick={() => navigate('/students')}>
                Nazad
            </Button>
        </Box>
    </Container>
}

export default StudentDetails;