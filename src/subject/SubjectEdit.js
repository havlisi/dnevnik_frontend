import { produce }  from "immer";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const SubjectEdit = () => {
  const subject = useLoaderData();
  const [updatedSubject, setUpdatedSubject] = useState(subject);

  const [predmetError, setPredmetError] = useState("");
  const navigate = useNavigate();

  const changeSubject = (e) => {
    setUpdatedSubject(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );

    setPredmetError((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));

    if (e.target.name === "subjectName") {
      const value = e.target.value.trim();
      if (value === "") {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Molim vas unesite naziv predmeta.",
        }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]:
            "Ne sme se uneti broj, molim vas unesite naziv predmeta.",
        }));
      } else if (value.length < 2 || value.length > 20) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Naziv predmeta mora biti između 2 i 20 karaktera.",
        }));
      } else {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "",
        }));
      }
    }

    if (e.target.name === "fondCasova") {
      const value = e.target.value;
      if (value === "") {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Molim vas unesite fond časova.",
        }));
      } else if (value <= 0 || value > 50) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "Nedeljni fond casova ne sme biti preko 50.",
        }));
      } else if (isNaN(value)) {
        setPredmetError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]:
            "Ne sme se unositi tekst, molim vas unesite broj do 50.",
        }));
      }
    }
  };

  const update = async () => {
    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      let response = await fetch(
        `http://localhost:8080/api/project/subject/updateSubject/${updatedSubject.ID}`,
        {
          method: "PUT",
          headers: {
            Authorization: u.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubject),
        }
      );
      console.log(response);
      if (response.ok) {
        let d = await response.json();
        console.log(JSON.stringify(d));
        alert("Successfully updated subject");
        navigate("/subjects");
      } else {
        console.log("Failed updating subject");
      }
    }
  };

  return <Container maxWidth="sm" sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
      <Typography sx={{ marginBottom: "20px", fontSize: "22px", color: "#E01E9B" }}>
        Ažuriranje predmeta <br />
        <span style={{ fontSize: "16px" }}>Molimo Vas unesite podatke u polja za unos.</span>
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          width: "80%",
          alignItems: "center",
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
          value={updatedSubject.subjectName}
          name="subjectName"
          placeholder="Subject name"
          helperText={predmetError.subjectName}
          error={Boolean(predmetError.subjectName)}
          onChange={changeSubject}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-noc-input"
          label="Number of classes"
          value={updatedSubject.fondCasova}
          name="fondCasova"
          helperText={predmetError.fondCasova}
          error={Boolean(predmetError.fondCasova)}
          onChange={changeSubject}
        />
        <Button sx = {{color:'#E01E9B'}}
          onClick={update} disabled={Object.values(predmetError).some((error) => error !== "")}>
          {" "}
          Save{" "}
        </Button>
      </Box>
    </Container>
};

export default SubjectEdit;
