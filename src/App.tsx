import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, Divider, Container, Grid, Paper, Snackbar, Alert } from '@mui/material';
import Routing from './components/Routing';
import Navbar from './components/NavBar';

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({
      open: false,
      msg: "",
    });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Divider />
        <List>
          <Navbar/>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Container maxWidth={false}>
          <Routing/>
        </Container>
      </Box>
      
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity="success">
          {snack.msg}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Dashboard;