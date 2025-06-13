import { Button, TableCell, TableRow } from "@mui/material";
import { Huishoudboekje } from "../../models/Huishoudboekje";
import { OnArchiveerHuishoudboekjes } from "../../services/huishoudboekjeService";
import { useAuth } from "../../contexts/AuthContext";

export function HuishoudboekjeArchivedRow({
  entry,
}: {
  entry: Huishoudboekje;
}) {
  const { user } = useAuth();

  const onArchiveer = (huishoudboekje: Huishoudboekje) => {
    OnArchiveerHuishoudboekjes(huishoudboekje.id, user!.id);
  };

  return (
    <TableRow key={entry.naam}>
      <TableCell component="th" scope="row">
        {entry.naam}
      </TableCell>
      <TableCell>{entry.omschrijving}</TableCell>
      <TableCell>
        <Button
          sx={{ alignSelf: "anchor-center", mr: "10px" }}
          variant="contained"
          onClick={(_) => onArchiveer(entry)}
        >
          Activeren
        </Button>
      </TableCell>
    </TableRow>
  );
}
