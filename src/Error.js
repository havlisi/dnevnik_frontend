import { Box, Typography } from "@mui/material";
import error from './assets/images/errorSlika.png'

const Error = () => {
    return <Box sx={{textAlign:'center'}}>
        <Typography className="typo" sx={{marginBottom:'30px', fontSize:'20px', color:'#E01E9B', textAlign:'center'}}>
                Niste ovlašćeni da vidite zaštićenu stranicu! <br />
                Molimo Vas, ulogujte se.
        </Typography>
        <img src={error} alt="logo"
        style={{ maxWidth: '350px', height: 'auto' }}/>
    </Box> 
}

export default Error;