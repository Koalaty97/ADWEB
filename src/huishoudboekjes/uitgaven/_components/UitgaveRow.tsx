import { Button, TableCell, TableRow } from "@mui/material";
import { Categorie } from "../../../models/Categorie";
import { CSS } from "@dnd-kit/utilities";
import { Uitgave } from "../../../models/Uitgave";
import { useDraggable } from "@dnd-kit/core";
import { deleteUitgave } from "../../../services/uitgavenService";
import { useState } from "react";
import { EditUitgaveModal } from "./EditUitgaveModal";

export function UitgaveRow({
  uitgaven,
  categorieen,
  isOwner,
}: {
  uitgaven: Uitgave;
  categorieen: Categorie[];
  isOwner: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: uitgaven.id,
    data: { source: "uitgaven" },
  });

  const verwijderen = async (uitgave: Uitgave) => {
    await deleteUitgave(uitgave.id);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell
        {...listeners}
        sx={{ cursor: "grab", width: 40, textAlign: "center" }}
      >
        {uitgaven.hoeveelheid}
      </TableCell>
      <TableCell>{uitgaven.datum.toDate().toLocaleDateString()}</TableCell>
      <TableCell>
        {categorieen.find((cat) => cat.id == uitgaven.categorieId)?.naam}
      </TableCell>
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
          <Button variant="contained" onClick={(_) => verwijderen(uitgaven)}>
            Verwijderen
          </Button>
        )}
      </TableCell>

      <EditUitgaveModal
        uitgave={uitgaven}
        categorieen={categorieen}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </TableRow>
  );
}
