import * as yup from 'yup';
import { AddHuishoudboekje } from '../services/huishoudboekjeService';
import { Box, Button, TextField, Typography } from '@mui/material';
import { HuishoudboekjeSchema } from '../models/Huishoudboekje';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotifier } from '../contexts/NotificationContext';
import { useState } from 'react';

const AddHuishoudboekjePage: React.FC = () => {
    const [naam, setNaam] = useState<string>("");
    const [omschrijving, setOmschrijving] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { notify } = useNotifier();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (event: React.FormEvent) : Promise<void> => {
        event.preventDefault();

        try {
          HuishoudboekjeSchema.validateSync({ naam: naam, omschrijving: omschrijving });
            AddHuishoudboekje({naam: naam, omschrijving: omschrijving, ownerId: user!.id, participants: []});
            notify("Huishoudboekje toegevoegd");
            navigate("/huishoudboekjes");
        } catch (err) {
            if (err instanceof yup.ValidationError)
            {
                setError(err.errors.join("\n"))
                return;
            }

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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Aanmaken</Button>
      </Box>
    )
};

export default AddHuishoudboekjePage;