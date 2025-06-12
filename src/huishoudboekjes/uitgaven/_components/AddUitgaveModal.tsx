import { useState } from 'react';
import { Modal, Box, TextField, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Categorie } from '../../../models/Categorie';
import style from '../../../styles/modal';

interface AddUitgaveModalParameters {
  open: boolean;
  onClose: () => void;
  categorieen: Categorie[];
  onAdd: (hoeveelheid: number, datum: Date, categorieId: string) => Promise<void>;
  error?: string;
}

export function AddUitgaveModal({ open, onClose, categorieen, onAdd, error }: AddUitgaveModalParameters) {
  const [hoeveelheid, setHoeveelheid] = useState<number>(0);
  const [datum, setDatum] = useState<Date>(new Date());
  const [categorie, setCategorie] = useState<string>("");

  const handleSubmit = async () => {
    await onAdd(hoeveelheid, datum, categorie);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" noValidate>
        <Typography variant="h6">Uitgave toevoegen</Typography>
        <TextField
          type="number"
          label="Hoeveelheid"
          fullWidth
          value={hoeveelheid}
          onChange={e => setHoeveelheid((e.target as HTMLInputElement).valueAsNumber)}
          margin="normal"/>
        <DatePicker
          label="Datum"
          value={datum}
          onChange={newDate => setDatum(newDate!)}/>
        <InputLabel id="categorie-label">Categorie</InputLabel>
        <Select
          labelId="categorie-label"
          value={categorie}
          onChange={e => setCategorie(e.target.value)}
          fullWidth>
          <MenuItem value="">- Geen -</MenuItem>
          {categorieen.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.naam}</MenuItem>
          ))}
        </Select>
        {error && <Typography color="error">{error}</Typography>}
        <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Aanmaken</Button>
      </Box>
    </Modal>
  );
}