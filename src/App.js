import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Divider, Drawer, IconButton, Button, Box, Container, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logotip from '../src/assets/images/logotip.png';
import { ChevronLeft, Menu } from '@mui/icons-material';
import React, { createContext, useState } from 'react';
import './App.css';
import { useLogin } from './login_logic';

export const UserContext = createContext(null);

function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, login, logout] = useLogin();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <UserContext.Provider value={{user, login, logout}}>
      <Stack>
        <AppBar className='appBar'
          position="fixed"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            backgroundColor: "rgba(255,255,255,0.44)",
            backdropFilter: "blur(20px)",
          }}
        >
          {user ?
          <Toolbar>
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                color: '#E01E9B',
                marginLeft: '2vw',
              }}
            >
              <Menu sx={{
                width:'4vh',
                height:'4vw'
              }}/>
            </IconButton>
          </Toolbar> : <></>}
          <Toolbar>
            <Box>
              <NavLink to={'/pocetna'}>
              <img
                src={logotip}
                alt="logo"
                style={{ maxWidth: '280px', height: 'auto', marginBottom:'7px'}}
              />
            </NavLink>
            </Box>
          </Toolbar>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
              <NavLink
                to="/login"
                activeClassName="activeLink"
                className="navLink"
                style={{ textDecoration: 'none', color: '#E01E9B', marginRight: '15px'}}
              >
                {user ? 
                (
                  <Button color="inherit" sx={{marginRight:'0.5vw', padding:"0px", fontSize: '14px' }} onClick={logout}>
                    Log out
                  </Button>
                ) : 
                (
                <Button color="inherit" sx={{marginRight:'0.5vw', padding:"0px", fontSize: '14px' }} onClick={() => navigate('/login')}>
                    Log in
                  </Button>
                )}
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </NavLink>
            </Stack>
        </AppBar>
        <Drawer className='drawer'
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            width: '150px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '250px',
              boxSizing: 'border-box',
              right: '15px',
            },
          }}
        >
          <Box>
            <IconButton>
              <ChevronLeft sx={{ color: '#E01E9B'}} onClick={handleDrawerClose}/>
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: '#E01E9B'}}/>
          <Stack direction="column" alignItems="flex-start" marginTop={2} marginLeft={5}>
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px' }}
              onClick={() => {navigate('/pocetna'); setOpen(false)}}
            >
              POČETNA
            </Button>
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
              onClick={() => {navigate('/subjects'); setOpen(false)}}
            >
              PREDMETI
            </Button>
            {user && user.role !== "ROLE_STUDENT" ? 
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
              onClick={() => {navigate('/students'); setOpen(false)}}
            >
              UČENICI
            </Button> : <></> }
          </Stack>
        </Drawer>
      </Stack>
      <Box sx={{ paddingTop: '100px' }}>
        <Outlet />
      </Box>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
