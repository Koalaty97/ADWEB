import { Button } from "@mui/material";

export function IncomeOverviewToolbar({ handleOpen }: { handleOpen: () => void })
{
    return(
        <div style={{ display: 'flex' }}>
            <h1 style={{ flex: 1 }}>&nbsp; Inkomsten</h1>
            <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={handleOpen}>Toevoegen</Button>
        </div>
    )
}