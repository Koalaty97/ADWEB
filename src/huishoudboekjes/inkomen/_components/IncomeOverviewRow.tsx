import { useDraggable } from "@dnd-kit/core";
import { TableRow, TableCell, Button } from "@mui/material";
import { Inkomst } from "../../../models/Inkomst";
import { deleteInkomst } from "../../../services/inkomstenService";
import { CSS } from '@dnd-kit/utilities';
import { Categorie } from "../../../models/Categorie";

export function IncomeRow({ inkomen, categorieen, isOwner }: { inkomen: Inkomst, categorieen: Categorie[], isOwner: boolean })
{
    const verwijderen = async (inkomst: Inkomst) => {
        await deleteInkomst(inkomst.id);
    }

    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({
            id: inkomen.id,
            data: { source: 'inkomens' },
        });

    const style = {
        transform: CSS.Transform.toString(transform)
    };

    return (
        <TableRow
        ref={setNodeRef}
        style={style}
        {...attributes}>
            <TableCell {...listeners} sx={{ cursor: 'grab', width: 40, textAlign: 'center' }}>
                {inkomen.hoeveelheid}
            </TableCell>
            <TableCell>{inkomen.datum.toDate().toLocaleDateString()}</TableCell>
            <TableCell>{categorieen.find((cat) => cat.id == inkomen.categorieId)?.naam}</TableCell>
            <TableCell>
            {isOwner && (
                <Button variant="contained" onClick={(_) => verwijderen(inkomen)}>Verwijderen</Button>
            )}
            </TableCell>
        </TableRow>
    );
}