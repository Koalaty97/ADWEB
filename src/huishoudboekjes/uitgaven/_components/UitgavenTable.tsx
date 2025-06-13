import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Categorie } from "../../../models/Categorie";
import { Uitgave } from "../../../models/Uitgave";
import { UitgaveRow } from "./UitgaveRow";

interface Props {
  uitgaven: Uitgave[];
  categorieen: Categorie[];
  isOwner: boolean;
}

export function UitgavenTable({ uitgaven, categorieen, isOwner }: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hoeveelheid</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Categorie</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uitgaven.map((u) => (
            <UitgaveRow
              key={u.id}
              uitgaven={u}
              categorieen={categorieen}
              isOwner={isOwner}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
