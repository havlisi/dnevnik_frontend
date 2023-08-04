import { Box, Container, Typography } from "@mui/material";
import deca from '../src/assets/images/deca.png'
import './App.css'

const Pocetna = () => {
    return <Container>
        <Typography sx={{marginBottom:'30px', fontSize:'20px', color:'#E01E9B', textAlign:'center'}}>
        Dobrodošli na vebsajt elektronskog dnevnika! <br />
        Molimo Vas, ulogujte se.
        </Typography>
        
        <Box sx={{textAlign:'center'}}>
            <img src={deca} alt="deca"
            style={{ width: '80%', height: '80%' }}/>
        </Box>
    </Container>
}

export default Pocetna;