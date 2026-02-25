import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#6366f1', // A slightly darker teal than the Navbar for contrast
        color: 'white',
        py: 6, // Padding top and bottom
        mt: 'bottom', // Pushes the footer to the bottom of the page
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Brand & Description Section */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospitalIcon sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Medora
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#b2dfdb' }}>
              Empowering healthcare through advanced AI-powered report analysis and seamless patient portals.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Quick Links
                </Typography>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Home</Link>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Services</Link>
            </Grid>
        

          {/* Contact Section */}
        
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            <IconButton color="inherit" aria-label="Email" component="a" href="mailto:support@neuralx.com">
              <EmailIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="GitHub" component="a" href="#">
              <GitHubIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mt: 2, color: '#b2dfdb' }}>
              Contact: support@medora.com
            </Typography>
          </Grid>
        

        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid #00796b' }}>
          <Typography variant="body2" sx={{ color: '#b2dfdb' }}>
            © {new Date().getFullYear()} Medora. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;