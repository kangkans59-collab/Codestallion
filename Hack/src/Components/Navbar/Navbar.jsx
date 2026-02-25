import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    // The sx prop allows you to easily apply custom CSS directly to MUI components
    <AppBar position="static" sx={{ backgroundColor: '#6366f1' }}> 
      <Toolbar>
        {/* Medical Logo / Icon */}
        <IconButton size="large" edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
          <LocalHospitalIcon />
        </IconButton>
        
        {/* Brand Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Medora
        </Typography>
        
        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
            sx={{ ml: 2 }} // Adds a little margin to the left to separate it from the text links
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;