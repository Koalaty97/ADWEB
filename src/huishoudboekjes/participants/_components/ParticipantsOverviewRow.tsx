import { TableRow, TableCell } from "@mui/material";

interface ParticipantOverviewRowParameters {
  email: string;
}

export function ParticipantOverviewRow({
  email,
}: ParticipantOverviewRowParameters) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {email}
      </TableCell>
    </TableRow>
  );
}
