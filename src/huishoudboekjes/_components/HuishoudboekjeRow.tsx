import { ArchiveerHuishoudboekjes } from '../../services/huishoudboekjeService';
import { Button, TableCell, TableRow } from '@mui/material';
import { Huishoudboekje, IsOwner } from '../../models/Huishoudboekje';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function HuishoudboekjeRow({ entry }: {
    entry: Huishoudboekje;
}) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const bekijken = (huishoudboekje: Huishoudboekje) => {
        navigate(`/huishoudboekjes/details/${huishoudboekje.id}`);
    }

    const aanpassen = (huishoudboekje: Huishoudboekje) => {
        navigate("/huishoudboekjes/aanpassen?id=" + huishoudboekje.id);
    }
    
    const archiveer = (huishoudboekje: Huishoudboekje) => {
        ArchiveerHuishoudboekjes(huishoudboekje.id, user!.id);
    }

    return(
        <TableRow key={entry.id}>
            <TableCell>{entry.naam}</TableCell>
            <TableCell>{entry.omschrijving}</TableCell>
            <TableCell>
                <div>
                <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={(_) => bekijken(entry)}>Bekijken</Button>
                {IsOwner(entry, user!.id) && (
                    <>
                        <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={(_) => aanpassen(entry)}>Aanpassen</Button>
                        <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={(_) => archiveer(entry)}>Deactiveren</Button>
                    </>
                )}
                </div>
            </TableCell>
        </TableRow>
    );
}