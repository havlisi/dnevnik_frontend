import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed_password, setConfirmedPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Molimo vas unesite ";
    const [korisnickoImeError, setKorisnickoImeError] = useState("");
    const [lozinkaError, setLozinkaError] = useState("");
    const [potvrdjenaLozinkaError, setPotvrdjenaLozinkaError] = useState("");
    const [imeError, setImeError] = useState("");
    const [prezimeError, setPrezimeError] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const navigate = useNavigate();

    const save = async () => {
        if (username === "" || password === "" || confirmed_password === "" || firstName === "" || lastName === "" || email === "") {
            setGlobalError("Please fill all fields in the form");
            return;
        }
      
        const new_student = {
            username: username,
            password: password, 
            confirmed_password: confirmed_password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch("http://localhost:8080/api/project/student/newStudentUser", {
                method: "POST",
                headers: {
                    Authorization : u.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_student),
            });
            console.log(response);
            if (response.ok) {
                let d = await response.json();
                console.log(JSON.stringify(d));
                alert("You have successfully created new student!");
                navigate("/students");
            } else {
                console.log("Failed creating new student");
            }
        }
    };
    
    return <Container maxWidth="sm" sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
        <Typography sx={{marginBottom:'20px', fontSize:'22px', color:'#E01E9B'}}>
            Kreiranje novog studenta <br />
            <span style={{ fontSize: '16px' }}>Molimo Vas unesite potrebne podatke u polja za unos.</span>        
        </Typography>
        <Box
            component="form"
            sx={{
                display: "flex",
                gap: "10px",
                width: "80%",
                alignItems:"center",
                flexDirection: "column",
                "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            >
              
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-isbn-input"
          label="Ime"
          placeholder="Ime"
          error={imeError}
          helperText={imeError}
          onBlur={(e) => {
            const value = e.target.value;
            setFirstName(value);
            if (!value) {
              setImeError(errorMessageTemplate + "ime.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setFirstName(value);
            if (!value) {
              setImeError(errorMessageTemplate + "ime.");
            } else if (!/^\D+$/.test(value)) {
              setImeError("Ne sme se uneti broj.");
            } else if (value.length < 2) {
              setImeError("Ime mora imati više od 2 karaktera");
            } else if (value.length > 30) {
              setImeError("Ime mora imati manje od 30 karaktera");
            } else {
              setImeError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-prezime-input"
          label="Prezime"
          placeholder="Prezime"
          required
          error={prezimeError}
          helperText={prezimeError}
          onBlur={(e) => {
            const value = e.target.value;
            setLastname(value);
            if (!value) {
              setPrezimeError(errorMessageTemplate + "prezime.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setLastname(value);
            if (!value) {
              setPrezimeError(errorMessageTemplate + "prezime.");
            } else if (!/^\D+$/.test(value)) {
              setPrezimeError("Ne sme se uneti broj.");
            } else if (value.length < 2) {
              setPrezimeError("Prezime mora imati više od 2 karaktera");
            } else if (value.length > 30) {
              setPrezimeError("Prezime mora imati manje od 30 karaktera");
            } else {
              setPrezimeError("");
            }
          }}
        />
         <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-email-input"
          label="E-mail"
          placeholder="E-mail"
          required
          error={emailError}
          helperText={emailError}
          onBlur={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) {
              setEmailError(errorMessageTemplate + "e-mail.");
          }}}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) {
              setEmailError(errorMessageTemplate + "e-mail.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              setEmailError("Unesite validnu e-mail adresu.");
            } else {
              setEmailError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Korisnicko ime"
          placeholder="Korisnicko ime"
          helperText={korisnickoImeError}
          error={korisnickoImeError === "" ? false : true}
          onBlur={(e)=> {
            const value = e.target.value;
            setUsername(value);
            if (!value) {
              setKorisnickoImeError(errorMessageTemplate + " korisnicko ime.");
          }}}
          onChange={(e) => {
            const value = e.target.value;
            setUsername(value);
            if (!value) {
              setKorisnickoImeError(errorMessageTemplate + " korisnicko ime.");
            } else if (!/^\D+$/.test(value)) {
              setKorisnickoImeError("Ne sme se uneti broj.");
            } else if (value.length < 5) {
              setKorisnickoImeError("Korisničko ime mora imati više od 5 karaktera");
            } else if (value.length > 25) {
              setKorisnickoImeError("Korisničko ime mora imati manje od 25 karaktera");
            } else if (!/^[a-zA-Z]+$/.test(value)) {
              setKorisnickoImeError("Korisničko ime ne sme imati razmak i brojeve.");
            } else {
              setKorisnickoImeError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Lozinka"
          placeholder="Lozinka"
          helperText={lozinkaError}
          error={lozinkaError === "" ? false : true}
          onBlur={(e) => {
            const value = e.target.value;
            setPassword(value);
            if (!value) {
              setLozinkaError(errorMessageTemplate + " lozinku.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if (!value) {
              setLozinkaError(errorMessageTemplate + " lozinku.");
            } else if (!/^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value)) {
              setLozinkaError("Lozinka mora da ima karaktere i brojeve.");
            } else if (!value.length > 5) {
              setLozinkaError("Lozinka mora imati više od 5 karaktera/brojeva");
            } else {
              setLozinkaError("");
            }
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Potvrdjena lozinka"
          placeholder="Potvrdjena lozinka"
          helperText={potvrdjenaLozinkaError}
          error={potvrdjenaLozinkaError === "" ? false : true}
          onBlur={(e) => {
            const value = e.target.value;
            setConfirmedPassword(value);
            if (!value) {
              setPotvrdjenaLozinkaError(errorMessageTemplate + "lozinku.");
            } 
          }}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmedPassword(value);
            if (!value) {
              setPotvrdjenaLozinkaError(errorMessageTemplate + " potvrdu lozinku.");
            } else if (value !== password) {
              setPotvrdjenaLozinkaError("Potvrdjena lozinka se mora poklapati sa lozinkom");
            }  else {
              setPotvrdjenaLozinkaError("");
            }
          }}
        />
        <Button sx = {{color:'#E01E9B'}}
          onClick={save}
          disabled={
            korisnickoImeError|| imeError || prezimeError || emailError
          }
        >
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
       
    </Container>
}

export default StudentForm;