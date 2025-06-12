import { TableRow, TableCell } from "@mui/material";

export function ParticipantOverviewRow(entry: any)
{
    return(
        <TableRow key={entry}>
            <TableCell component="th" scope="row">
                {entry}
            </TableCell>
        </TableRow>
    )
}