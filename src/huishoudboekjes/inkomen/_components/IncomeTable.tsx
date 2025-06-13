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
import { Inkomst } from "../../../models/Inkomst";
import { IncomeRow } from "./IncomeOverviewRow";

interface Props {
  inkomsten: Inkomst[];
  categorieen: Categorie[];
  isOwner: boolean;
}

export function IncomeTable({ inkomsten, categorieen, isOwner }: Props) {
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
          {inkomsten.map((i) => (
            <IncomeRow
              key={i.id}
              inkomen={i}
              categorieen={categorieen}
              isOwner={isOwner}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
