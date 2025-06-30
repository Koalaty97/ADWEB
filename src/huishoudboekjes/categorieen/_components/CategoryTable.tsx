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
import { CategoryRow } from "./CategoryRow";

interface CategoryRowParameters {
  categories: Categorie[];
  isOwner: boolean;
}

export function CategoryTable({ categories, isOwner }: CategoryRowParameters) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Naam</TableCell>
            <TableCell>Max budget</TableCell>
            <TableCell>Inkomen</TableCell>
            <TableCell>Uitgaven</TableCell>
            <TableCell>Beschikbaar budget</TableCell>
            <TableCell>Einddatum</TableCell>
            <TableCell>Acties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <CategoryRow key={cat.id} category={cat} isOwner={isOwner} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
