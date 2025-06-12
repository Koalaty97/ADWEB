import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import style from '../../../styles/modal';

interface AddCategorieModalParameters {
  open: boolean;
  onClose: () => void;
  onAdd: (naam: string, maxbudget: number, einddatum: Date | undefined) => Promise<void>;
  error?: string;
}

export function AddCategorieModal({ open, onClose, onAdd, error }: AddCategorieModalParameters) {
  const [naam, setNaam] = useState<string>('');
  const [budget, setBudget] = useState<number>(0);
  const [datum, setDatum] = useState<Date | undefined>(undefined);

  const handleSubmit = async () => {
    await onAdd(naam, budget, datum);
    onClose();

    setNaam('');
    setBudget(0);
    setDatum(undefined);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" noValidate>
        <Typography variant="h6" gutterBottom>
          Categorie toevoegen
        </Typography>
        <TextField
          label="Naam"
          fullWidth
          margin="normal"
          value={naam}
          onChange={e => setNaam(e.target.value)}
        />
        <TextField
          label="Max budget"
          type="number"
          fullWidth
          margin="normal"
          value={budget}
          onChange={e => setBudget(Number(e.target.value))}
        />
        <DatePicker
          label="Einddatum"
          value={datum}
          onChange={newDate => setDatum(newDate || undefined)}
          slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Aanmaken
        </Button>
      </Box>
    </Modal>
  );
}