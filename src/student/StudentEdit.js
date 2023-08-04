import { produce } from "immer";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";

const StudentEdit = () => {
    const student = useLoaderData();
    const [updatedStudent, setUpdatedStudent] = useState(student);
    const [studentError, setStudentError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const navigate = useNavigate();
  
    const changeStudent = (e) => {
      setUpdatedStudent(produce((draft) => {
        draft[e.target.name] = e.target.value;
      }));
    
      setStudentError((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    
      if (e.target.name === "firstName") {
        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite ime",
          }));
        } else if (!/^\D+$/.test(e.target.value)) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Ime ne sme sadržati broj.",
          }));
        } else if (e.target.value.length < 2) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Ime mora imati više od 2 karaktera.",
          }));
        } else if (e.target.value.length > 30) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Ime mora imati manje od 30 karaktera",
          }));
        } else {
          setStudentError("");
        }
      }

      if (e.target.name === "lastName") {
        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite prezime",
          }));
        } else if (!/^\D+$/.test(e.target.value)) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Prezime ne sme sadržati broj.",
          }));
        } else if (e.target.value.length < 2) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Prezime mora imati više od 2 karaktera.",
          }));
        } else if (e.target.value.length > 30) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Prezime mora imati manje od 30 karaktera",
          }));
        } else {
          setStudentError("");
        }
      }

      if (e.target.name === "username") {
        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite korisničko ime",
          }));
        } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Korisničko ime ne sme imati razmak i brojeve.",
          }));
        } else if (e.target.value.length < 5) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Korisničko ime mora imati više od 5 karaktera.",
          }));
        } else if (e.target.value.length > 25) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Korisničko ime mora imati više od 25 karaktera",
          }));
        } else {
          setStudentError("");
        }
      }
      
      if (e.target.name === "email") {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite e-mail adresu.",
          }));
        } else if (!emailRegex.test(e.target.value)) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo unesite pravilnu e-mail adresu.",
          }));
        }else {
          setStudentError("");
        }
      }
    
      if (e.target.name === "password") {
        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite lozinku",
          }));
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d).*$/.test(e.target.value)) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Lozinka mora da ima karaktere i brojeve.",
          }));
        } else if (e.target.value.length < 5) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Lozinka mora imati više od 5 karaktera/brojeva",
          }));
        } else {
          setStudentError("");
        }
      }

      if (e.target.name === "confirmed_password") {
        if (!e.target.value) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Molimo vas unesite potvrdu lozinke.",
          }));
        } else if (e.target.value !== updatedStudent.password) {
          setStudentError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Potvrdjena lozinka se mora poklapati sa lozinkom",
          }));
        } else {
          setStudentError("");
        }
      }
    };

    const update = async () => {
      if (
        updatedStudent.firstName === "" ||
        updatedStudent.lastName === "" ||
        updatedStudent.username === "" ||
        updatedStudent.email === "" ||
        updatedStudent.password === "" ||
        updatedStudent.confirmed_password === ""
      ) {
        setGlobalError("Please fill in all the fields in the form");
        return;
      }
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let response = await fetch(`http://localhost:8080/api/project/student/updateStudent/${updatedStudent.ID}`, {
            method: "PUT",
            headers: {
                Authorization : u.token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("Successfully updated student");
            navigate("/students");
        } else {
            console.log("Failed updating student");
            console.log(response)
        }

      }
    }
    
    return <Container maxWidth="sm" sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
        <Typography sx={{marginBottom:'20px', fontSize:'22px', color:'#E01E9B'}}>
            Ažuriranje studenta <br />
            <span style={{ fontSize: '16px' }}>Molimo Vas unesite podatke u polja za unos.</span>        
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
            id="outlined-ime-required"
            label="Ime"
            value={updatedStudent.firstName}
            placeholder="Ime"
            name="firstName"
            error={Boolean(studentError.firstName)}
            helperText={studentError.firstName}
            onChange={changeStudent}
        />
        <TextField
            sx={{ width: "100px" }}
            fullWidth
            required
            id="outlined-prezime-input"
            label="Prezime"
            value={updatedStudent.lastName}
            placeholder="Prezime"
            name="lastName"
            error={Boolean(studentError.lastName)}
            helperText={studentError.lastName}
            onChange={changeStudent}
        />
        <TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="Korisnicko ime"
            value={updatedStudent.username}
            placeholder="Korisnicko ime"
            name="username"
            helperText={studentError.username}
            error={Boolean(studentError.username)}
            onChange={changeStudent}
        />
        <TextField
            sx={{ width: "100px" }}
            fullWidth
            required
            id="outlined-email-input"
            label="E-mail"
            value={updatedStudent.email}
            placeholder="E-mail"
            name="email"
            helperText={studentError.email}
            error={Boolean(studentError.email)}
            onChange={changeStudent}
        />
        <TextField
            sx={{ width: "100px" }}
            fullWidth
            required
            id="outlined-password-required"
            label="Password"
            value={updatedStudent.password}
            name="password"
            placeholder="Password"
            error={Boolean(studentError.password)}
            helperText={studentError.password}
            onChange={changeStudent}
        />
        <TextField
            sx={{ width: "100px" }}
            fullWidth
            required
            id="outlined-confirmed_password-required"
            label="Potvrdjena lozinka"
            value={updatedStudent.confirmed_password}
            placeholder="Potvrdjena lozinka"
            name="confirmed_password"
            helperText={studentError.confirmed_password}
            error={Boolean(studentError.confirmed_password)}
            onChange={changeStudent}
        />
        <Button sx = {{color:'#E01E9B'}}
            onClick={update}
            disabled={Object.values(studentError).some((error) => error !== "")}>
            {" "}Save{" "}
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>

}

export default StudentEdit;