import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import style from "../../../styles/modal";

interface AddParticipantModalParameters {
  open: boolean;
  email: string;
  error?: string | null;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const AddParticipantModal: React.FC<AddParticipantModalParameters> = ({
  open,
  email,
  error,
  loading,
  onEmailChange,
  onClose,
  onSubmit,
}) => (
  <Modal open={open} onClose={onClose} aria-labelledby="add-participant">
    <Box
      component="form"
      sx={style}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Typography variant="h6">Lid toevoegen</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        autoComplete="email"
        autoFocus
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Bezig..." : "Toevoegen"}
      </Button>
    </Box>
  </Modal>
);
