import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AddUser } from '../services/userService';
import User from '../models/User';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateInput())
    {
      return;
    }

    setError("");

    try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        const user = { id: userInfo.user.uid, email: userInfo.user.email! };
        login(user);
        navigate("/");
    } catch (error) {
        setError("Invalid credentials!");
    }
  };

  const handleRegister = async() => {
    if (!validateInput())
    {
      return;
    }
    
    try {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        const user: User = { 
          id: userInfo.user.uid, 
          email: userInfo.user.email! 
        };
        await AddUser(user);
        login(user);
        navigate("/");
    } catch (error) {
        setError("Unable to sign up.");
    }
  }

  function validateInput() : boolean {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>Sign In</Button>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleRegister}>Sign Up</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;