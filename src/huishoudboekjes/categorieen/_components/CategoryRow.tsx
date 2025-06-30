import { useDroppable } from "@dnd-kit/core";
import { TableRow, TableCell, Button } from "@mui/material";
import { Categorie } from "../../../models/Categorie";
import { removeCategorie } from "../../../services/categorieService";
import { useState } from "react";
import { EditCategorieModal } from "./EditGategorieModel";
import { resetInkomstenCategorieByCategorieId } from "../../../services/inkomstenService";
import { resetUitgavenCategorieByCategorieId } from "../../../services/uitgavenService";

export function CategoryRow({
  category,
  isOwner,
}: {
  category: Categorie;
  isOwner: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: category.id,
    data: { type: "category" },
  });
  const budgetPercentage = (category.budgetOut / category.maxbudget) * 100;
  let bgcolor: string | undefined;
  if (budgetPercentage > 100) {
    bgcolor = "red";
  } else if (budgetPercentage > 80) {
    bgcolor = "orange";
  }
  const [modalOpen, setModalOpen] = useState(false);

  const verwijderen = async (categorie: Categorie) => {
    await Promise.all([
      resetUitgavenCategorieByCategorieId(categorie.id),
      resetInkomstenCategorieByCategorieId(categorie.id),
      removeCategorie(categorie.id),
    ]);
  };

  return (
    <TableRow
      ref={setNodeRef}
      sx={{
        bgcolor: isOver ? "action.selected" : bgcolor,
        transition: "background-color 150ms",
      }}
    >
      <TableCell>{category.naam}</TableCell>
      <TableCell>{category.maxbudget}</TableCell>
      <TableCell>{category.budgetIn}</TableCell>
      <TableCell>{category.budgetOut}</TableCell>
      <TableCell>{category.budgetRemaining}</TableCell>
      <TableCell>{category.einddatum?.toDate().toLocaleDateString()}</TableCell>
      <TableCell>
        {isOwner && (
          <Button
            sx={{ alignSelf: "anchor-center", mr: "10px" }}
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            Aanpassen
          </Button>
        )}
        {isOwner && (
          <Button
            sx={{ alignSelf: "anchor-center", mr: "10px" }}
            variant="contained"
            onClick={async (_) => await verwijderen(category)}
          >
            Verwijderen
          </Button>
        )}
      </TableCell>

      <EditCategorieModal
        categorie={category}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </TableRow>
  );
}
