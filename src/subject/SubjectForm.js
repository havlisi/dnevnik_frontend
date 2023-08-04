import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubjectForm = () => {
    const [newSubject, setNewSubject] = useState({
        subjectName: "",
        fondCasova: ""
    });

    const [subjectNameError, setSubjectNameError] = useState("");
    const [fondCasovaError, setFondCasovaError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const navigate = useNavigate();

    const save = async () => {
        if (newSubject.subjectName === "" || newSubject.fondCasova === "") {
            setGlobalError("Please fill all the fields in the form")
            return;
        }
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch("http://localhost:8080/api/project/subject/newSubject", {
                method: "POST",
                headers: {
                    Authorization : u.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSubject),
            });
            console.log(response);
            if (response.ok) {
                let d = await response.json();
                console.log(JSON.stringify(d));
                alert("You have successfully created new subject!");
                navigate("/subjects");
            } else {
                console.log("Failed creating new subject");
            }
        }
    };
    
    return <Container maxWidth="sm" sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
        <Typography sx={{marginBottom:'20px', fontSize:'22px', color:'#E01E9B'}}>
            Kreiranje novog predmeta <br />
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
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="Subject name"
            value={newSubject.subjectName}
            placeholder="Subject name"
            helperText={subjectNameError}
            error={subjectNameError === "" ? false : true}
            onBlur={(e) => {
                const value = e.target.value;
                if (value === "") {
                    setSubjectNameError("Molim vas unesite naziv predmeta.");
                }
            }}
            onChange={(e) => {
                setNewSubject(
                  produce((draft) => {
                    draft.subjectName = e.target.value;
                  })
                );
                if (e.target.value === "") {
                    setSubjectNameError("Molim vas unesite naziv predmeta.");
                } else if (!/^[a-zA-Z\s]+$/.test(e.target.value)) {
                    setSubjectNameError("Ne sme se uneti broj, molim vas unesite naziv predmeta.");
                } else if (e.target.value.length < 2){
                    setSubjectNameError("Naziv predmeta mora imati više od 2 karaktera.");
                } else if (e.target.value.length > 20){
                    setSubjectNameError("Naziv predmeta mora imati manje od 20 karaktera.");
                } else setSubjectNameError("");
            }}
        />
        <TextField
            sx={{ width: "100px" }}
            fullWidth
            required
            id="outlined-noc-input"
            label="Number of classes"
            value={newSubject.fondCasova}
            error={fondCasovaError}
            helperText={fondCasovaError}
            onBlur={(e) => {
                const value = e.target.value;
                if (value === "") {
                    setFondCasovaError("Molim vas unesite fond časova.");
                }
            }}
            onChange={(e) => {
                setNewSubject(
                    produce((draft) => {
                      draft.fondCasova = e.target.value;
                    })
                );
                const value = e.target.value;
                if (value === "") {
                    setFondCasovaError("Molim vas unesite fond časova.");
                } else if (value <= 0 || value > 50) {
                    setFondCasovaError("Nedeljni fond casova ne sme biti preko 50.");
                } else if (isNaN(value)) {
                    setFondCasovaError("Ne sme se unositi tekst, molimo vas unesite broj do 50.");
                } else setFondCasovaError("");
            }}
        />
        <Button sx = {{color:'#E01E9B'}}
            onClick={save}
            disabled={fondCasovaError || subjectNameError }>
            {" "}Save{" "}
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
}


export default SubjectForm;