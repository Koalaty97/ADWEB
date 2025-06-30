import {
  TableContainer,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ParticipantOverviewRow } from "./ParticipantsOverviewRow";

interface ParticipantsTableParameters {
  participants: string[];
  onAddClick: () => void;
  isOwner: boolean;
}

export const ParticipantsTable: React.FC<ParticipantsTableParameters> = ({
  participants,
  onAddClick,
  isOwner,
}) => (
  <TableContainer component={Paper}>
    <div style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
      <Typography variant="h6" sx={{ flex: 1 }}>
        &nbsp;Leden
      </Typography>
      {isOwner && (
        <Button variant="contained" onClick={onAddClick}>
          Toevoegen
        </Button>
      )}
    </div>
    <Table sx={{ minWidth: 650 }} aria-label="participants">
      <TableHead>
        <TableRow>
          <TableCell>Persoon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {participants.map((email) => (
          <ParticipantOverviewRow key={email} email={email} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
