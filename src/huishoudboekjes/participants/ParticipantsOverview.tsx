import { useState } from 'react';
import { AddHuishoudeboekjeParticipant } from '../../services/huishoudboekjeService';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifier } from '../../contexts/NotificationContext';
import * as yup from 'yup';
import style from '../../styles/modal';
import { ParticipantOverviewRow } from './_components/ParticipantsOverviewRow';

interface ParticipantsOverviewParams {
    huishoudboekjeId: string;
    participants: string[];
}

const participantSchema = yup.object({
  email: yup.string().required().email()
});

const ParticipantsOverview: React.FC<ParticipantsOverviewParams> = ({ huishoudboekjeId, participants }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [participant, setParticipant] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  const { notify } = useNotifier();

  const submitHandler = async () => {
    try 
    {
      participantSchema.validateSync({ email: participant });
      await AddHuishoudeboekjeParticipant(huishoudboekjeId, user!.id, participant);
      handleClose();
      notify("Lid succesvol toegevoegd!");
      setParticipant("");
      setError("");
    }
    catch (err)
    {
      if (err instanceof yup.ValidationError)
      {
          setError(err.errors.join("\n"))
          return;
      }

      console.error(err);
      setError("Gebruiker niet kunnen toevoegen");
    }
  }

    return(
      <>
        <TableContainer component={Paper}>
        <div style={{display: 'flex'}}>
          <h1 style={{flex: 1}}>&nbsp; Leden</h1>
          <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={handleOpen}>Toevoegen</Button>
        </div>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Persoon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((entry) => (
              <ParticipantOverviewRow key={entry} entry={entry} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} onSubmit={submitHandler}>
            <h1>Lid toevoegen</h1>
            <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus value={participant} onChange={(e: any) => setParticipant(e.target.value)}/>
            {error && (
                <Typography color="error" variant="body2">
                {error}
                </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={submitHandler}>Toevoegen</Button>
        </Box>
    </Modal>
      </>
    )
}

export default ParticipantsOverview;