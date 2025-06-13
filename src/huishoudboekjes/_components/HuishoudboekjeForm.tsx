import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import {
  Huishoudboekje,
  HuishoudboekjeSchema,
} from "../../models/Huishoudboekje";
import { ValidationError } from "yup";

interface HuishoudboekjeFormParameters {
  initial?: Huishoudboekje;
  onSubmit: (data: { naam: string; omschrijving: string }) => void;
}

export const HuishoudboekjeForm: React.FC<HuishoudboekjeFormParameters> = ({
  initial,
  onSubmit,
}) => {
  const [naam, setNaam] = useState(initial?.naam ?? "");
  const [omschrijving, setOmschrijving] = useState(initial?.omschrijving ?? "");
  const [error, setError] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      HuishoudboekjeSchema.validateSync({
        naam: naam,
        omschrijving: omschrijving,
      });
      onSubmit({ naam, omschrijving });
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.errors.join("\n"));
        return;
      }

      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        p: 2,
      }}
    >
      <Typography variant="h5">Huishoudboekje bewerken</Typography>

      <TextField
        required
        fullWidth
        label="Naam"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
      />

      <TextField
        fullWidth
        label="Omschrijving"
        value={omschrijving}
        onChange={(e) => setOmschrijving(e.target.value)}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Opslaan
      </Button>
    </Box>
  );
};
