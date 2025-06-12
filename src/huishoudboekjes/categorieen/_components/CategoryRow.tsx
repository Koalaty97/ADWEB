import { useDroppable } from "@dnd-kit/core";
import { TableRow, TableCell } from "@mui/material";
import { Categorie } from "../../../models/Categorie";

export function CategoryRow({ category }: { category: Categorie }) {
  const { isOver, setNodeRef } = useDroppable({ id: category.id, data: { type: 'category' } });
  const budgetPercentage = (category.budgetOut / category.maxbudget) * 100;
  let bgcolor: string | undefined;
  if (budgetPercentage > 100) 
    {
        bgcolor = 'red';
    }
  else if (budgetPercentage > 80) 
    {
        bgcolor = 'orange';
    }

  return (
    <TableRow
      ref={setNodeRef}
      sx={{ bgcolor: isOver ? 'action.selected' : bgcolor, transition: 'background-color 150ms' }}
    >
      <TableCell>{category.naam}</TableCell>
      <TableCell>{category.maxbudget}</TableCell>
      <TableCell>{category.budgetIn}</TableCell>
      <TableCell>{category.budgetOut}</TableCell>
      <TableCell>{category.budgetRemaining}</TableCell>
      <TableCell>
        {category.einddatum?.toDate().toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}