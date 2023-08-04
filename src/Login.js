import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Box, TextField, Button, Container, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useContext } from 'react';
import './App.css'

const Login = () => {
    const {user, login, logout} = useContext(UserContext);
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          login();
        }
    };

    const [errorLogin, setErrorLogin] = useState(false);

    const closeErrorMsg = () => {
      setErrorLogin(false);
    }

    const loginUser = async () => {
        const result = await fetch('http://localhost:8080/api/v1/login', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(loginData),
        });
        if(result.ok) {
            const user = await result.json();
            login(user);
            localStorage.setItem("user", JSON.stringify(user));
            console.log('Ulogovan korisnik ' + JSON.stringify(user))
            navigate('/pocetna');
            setErrorLogin(false);
        } else {
            console.log('Problem prilikom logovanja');
            setErrorLogin(true);
        }
    }

    return (
        <Container>
            <Typography className="typo" sx={{marginBottom:'30px', fontSize:'20px', color:'#E01E9B', textAlign:'center'}}>
                Dobrodošli na vebsajt elektronskog dnevnika! <br />
                Molimo Vas, ulogujte se.
            </Typography>
            <Box sx={{margin:'50px auto 30px auto', alignItems:'center',  width: '40%', textAlign:'center'}}>
                <TextField
                    required 
                    placeholder="Email" 
                    label="Email"
                    onChange={(e) => {
                        const dataForLogin = {...loginData};
                        dataForLogin.email = e.target.value;
                        setLoginData(dataForLogin);
                    }}
                    onKeyDown ={handleKeyDown}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        width:'100%', 
                        marginBottom:'25px',
                    }}/>
                <TextField
                    required 
                    placeholder="Password" 
                    label="Password"
                    onChange={(e) => {
                        const dataForLogin = {...loginData};
                        dataForLogin.password = e.target.value;
                        setLoginData(dataForLogin);
                    }}
                    onKeyDown ={handleKeyDown}
                    sx={{width:'100%'}} 
                    type='password'/>
                <Button sx={{marginTop: '15px', color: '#E01E9B'}} onClick={loginUser} >Login</Button>
            </Box>
            <Snackbar open={errorLogin} onClose={closeErrorMsg}>
                <Alert onClose={closeErrorMsg} severity='error' sx={{width:'100%'}}>
                    Problem prilikom logovanja
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Login;