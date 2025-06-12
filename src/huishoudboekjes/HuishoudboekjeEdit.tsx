import { Huishoudboekje } from '../models/Huishoudboekje';
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { GetHuishoudboekjeById, UpdateHuishoudboekje } from '../services/huishoudboekjeService';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotifier } from '../contexts/NotificationContext';

const EditHuishoudboekjePage: React.FC = () => {
    const [naam, setNaam] = useState<string>("");
    const [omschrijving, setOmschrijving] = useState<string>("");
    const [huishoudboekje, setHuishoudboekje] = useState<Huishoudboekje>();
    const [error, setError] = useState<string>("");
    const { notify } = useNotifier();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchHuishoudboekje(id!);
    }, []);

    const fetchHuishoudboekje = async (id: string) => {
        var boekje = await GetHuishoudboekjeById(id!, user!.id);
        
        if (!boekje)
        {
          console.error(`Huishoudboekje ${id} niet gevonden`);
          return;
        }

        setHuishoudboekje(boekje);
        setNaam(boekje.naam);
        setOmschrijving(boekje.omschrijving);
    }

    const handleSubmit = async (event: React.FormEvent) : Promise<void> => {
        event.preventDefault();
        if (!huishoudboekje!.naam)
        {
            setError("Naam is verplicht");
            return;
        }

        huishoudboekje!.naam = naam;
        huishoudboekje!.omschrijving = omschrijving;

        try {
            await UpdateHuishoudboekje(huishoudboekje!);
            notify("Huishoudboekje aangepast");
            navigate("/huishoudboekjes");
        } catch (err) {
            console.error('Error uploading entry:', err);
            setError('Kon niet opslaan. Probeer het later opnieuw.');
        }
    }

    return (    
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        p: 2,
      }}>
        <h1>Huishoudboekje toevoegen</h1>
        <TextField margin="normal" required fullWidth id="naam" label="Naam" name="naam" autoComplete="naam" autoFocus value={naam} onChange={(e) => setNaam(e.target.value)}/>
        <TextField margin="normal" fullWidth name="omschrijving" label="Omschrijving" id="omschrijving" autoComplete="omschrijving" value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)}/>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Aanpassen</Button>
      </Box>
    )
};

export default EditHuishoudboekjePage;