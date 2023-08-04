import ShowSubject from "./ShowSubject.js";
import { useState, useEffect, useContext } from "react";
import { Box, Button, Container, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App.js";
import '../index.css';

const normalizeText = (text) => {
    return text
    .replace("Đ", 'DJ')
    .replace("Ž", 'Z')
    .replace("Ć", 'C')
    .replace("Č", 'C')
    .replace("Š", 'S');
}

const ShowSubjects = () => {
    const [subjects, setAllSubjects] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const {user, login, logout} = useContext(UserContext);


    useEffect(() => {
        if (search === '') {
            setAllSubjects(subjects);
            setData(subjects);
        } else {
            const normalizedSearch = normalizeText(search.toUpperCase());
            const filteredData  = subjects.filter((subject) => {
                const normalizedText = normalizeText(subject.subjectName.toUpperCase());
                return normalizedText.includes(normalizedSearch);
            })
            setData(filteredData);
        }
    }, [search]);
    
    useEffect(() => {
        const getSubjects = async () => {
            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                let result = await fetch("http://localhost:8080/api/project/subject", {
                    headers: {
                        Authorization : u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });
                console.log(result);
                if (result.ok) {
                    let subjects_r = await result.json();
                    setData(subjects_r);
                    setAllSubjects(subjects_r);
                } 
            }
        }; 
        getSubjects();
    }, []);

    const handleDelete = (subjectId) => {
        const fileteredSubjects = subjects.filter((s) => s.ID != subjectId);
        setData(fileteredSubjects);
        setAllSubjects(fileteredSubjects);
      };

    return <>
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <OutlinedInput
                    className='custom-textfield'
                    type='text'
                    placeholder='Search...'
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0.5px solid #6bb187',
                        },
                        '&:hover': {
                            boxShadow: '0 0 5px #6bb187',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #6bb187',
                            },
                        },
                    }}
                    startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    }
                    />
            </Box>
            {user && user.role === "ROLE_ADMIN" ?
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop:'-45px'}}>
                <Button variant="outlined" onClick={() => navigate("new_subject")} 
                    sx={{
                        padding:'10px 15px',
                        backgroundColor: "rgba(253, 246, 238, 0.396)",
                        backdropFilter: "blur(4px)",
                        color: "#418258",
                        borderRadius: "15px",
                        border: '0.5px solid #6bb187',
                        "&:hover" : {
                            border: '0.5px solid #6bb187',
                            backgroundColor: "rgba(253, 246, 238, 0.7)",
                            backdropFilter: "blur(4px)",
                        }
                    }}>
                    {" "}Add new subject{" "}
                </Button>
            </Box> : <></> }
            <Grid sx={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
                    gridGap: '36px', 
                    margin: '40px auto',
                }}>
                {data.map((s)=> <ShowSubject subject={s}  key={s.ID} onDelete={handleDelete}/>)}
            </Grid>
        </Container>
    </>
}

export default ShowSubjects;