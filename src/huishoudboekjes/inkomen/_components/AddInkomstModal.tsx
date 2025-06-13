import style from "../../../styles/modal";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Categorie } from "../../../models/Categorie";
import { DatePicker } from "@mui/x-date-pickers";
import { InkomstSchema } from "../../../models/Inkomst";
import { useState } from "react";
import { ValidationError } from "yup";

interface AddInkomstModalParameters {
  open: boolean;
  onClose: () => void;
  categorieen: Categorie[];
  onAdd: (
    hoeveelheid: number,
    datum: Date,
    categorieId: string
  ) => Promise<void>;
}

export function AddInkomstModal({
  open,
  onClose,
  categorieen,
  onAdd,
}: AddInkomstModalParameters) {
  const [hoeveelheid, setHoeveelheid] = useState<number>(0);
  const [datum, setDatum] = useState<Date>(new Date());
  const [categorie, setCategorie] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async () => {
    try {
      InkomstSchema.validateSync({ hoeveelheid: hoeveelheid, datum: datum });
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
        <Typography variant="h6" gutterBottom>
          Inkomst toevoegen
        </Typography>
        <TextField
          required
          label="Hoeveelheid"
          type="number"
          fullWidth
          margin="normal"
          value={hoeveelheid}
          onChange={(e) => setHoeveelheid(Number(e.target.value))}
        />
        <DatePicker
          label="Datum"
          value={datum}
          onChange={(newDate) => setDatum(newDate!)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
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
