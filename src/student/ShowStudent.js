import { useNavigate } from 'react-router-dom';
import { 
    Box,
    Card, 
    CardContent, 
    CardHeader, 
    Grid, IconButton, 
    Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from '../App';
import { useContext } from 'react';
import '../index.css';

const ShowStudent = ({student, onDelete}) => {
    const {user, login, logout} = useContext(UserContext);
    const navigate = useNavigate();

    const deleteStudent = async () => {
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch(`http://localhost:8080/api/project/student/deleteStudent/by-id/${student.ID}`, {
                method: "DELETE",
                headers: {
                    Authorization : u.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                let d = await response.json();
                console.log(d);
                console.log("Successfully deleted student");
                onDelete(student.ID);
            } else {
             console.log("Error while deleting student");
            }
        }
    };

    return (
        <Grid item xs={4}>
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
                        fontSize: "1.3em",
                        backgroundColor: "#6bb187",
                        padding: "7% 0%",
                        height:'50px'
                    }}
                    subheader={
                        <Typography style={{
                            color: "white",
                            fontSize: "1.3em"
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
                        padding: '15px 20px 10px 20px',
                        fontWeight: 'light',
                        fontSize: '1em'
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
                {user && user.role === "ROLE_ADMIN" ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title="Info">
                        <IconButton
                            sx={{margin:'0px 8px 15px 8px', color:'#6bb187'}}
                            aria-label="info"
                            onClick={() => navigate(`student_details/${student.ID}`)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton sx={{margin:'0px 8px 15px 8px', color:'#6bb187'}} aria-label="edit" onClick={() => navigate(`edit_student/${student.ID}`)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton sx={{margin:'0px 8px 15px 8px', color:'#6bb187'}} aria-label="delete" onClick={deleteStudent}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> 
                </Box> : <></>}
            </Card>
        </Grid>
    )
}

export default ShowStudent;