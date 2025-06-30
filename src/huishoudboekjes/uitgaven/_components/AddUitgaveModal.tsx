import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Categorie } from "../../../models/Categorie";
import style from "../../../styles/modal";
import { ValidationError } from "yup";
import { UitgaveSchema } from "../../../models/Uitgave";

interface AddUitgaveModalParameters {
  open: boolean;
  onClose: () => void;
  categorieen: Categorie[];
  onAdd: (
    hoeveelheid: number,
    datum: Date,
    categorieId: string
  ) => Promise<void>;
}

export function AddUitgaveModal({
  open,
  onClose,
  categorieen,
  onAdd,
}: AddUitgaveModalParameters) {
  const [hoeveelheid, setHoeveelheid] = useState<number>(0);
  const [datum, setDatum] = useState<Date>(new Date());
  const [categorie, setCategorie] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async () => {
    try {
      UitgaveSchema.validateSync({ hoeveelheid: hoeveelheid, datum: datum });
      await onAdd(hoeveelheid, datum, categorie);
      onClose();
      setHoeveelheid(0);
      setDatum(new Date());
      setCategorie("");
      setError(undefined);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors.join("\n"));
        return;
      }
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" noValidate>
        <Typography variant="h6">Uitgave toevoegen</Typography>
        <TextField
          required
          type="number"
          label="Hoeveelheid"
          fullWidth
          value={hoeveelheid}
          onChange={(e) =>
            setHoeveelheid((e.target as HTMLInputElement).valueAsNumber)
          }
          margin="normal"
        />
        <DatePicker
          label="Datum"
          value={datum}
          onChange={(newDate) => setDatum(newDate!)}
        />
        <InputLabel id="categorie-label">Categorie</InputLabel>
        <Select
          labelId="categorie-label"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          fullWidth
        >
          <MenuItem value="">- Geen -</MenuItem>
          {categorieen.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.naam}
            </MenuItem>
          ))}
        </Select>
        {error && <Typography color="error">{error}</Typography>}
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
