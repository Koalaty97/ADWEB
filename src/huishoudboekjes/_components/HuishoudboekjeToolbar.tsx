import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HuishoudboekjeToolbar() {
    const navigate = useNavigate();

    const toevoegen = () => {
      navigate("/huishoudboekjes/toevoegen");
    }

    const navigateToGearchiveerdeHuishoudboekjes = () => {
      navigate("/huishoudboekjes/gearchiveerd");
    }

    return(
        <div style={{display: 'flex'}}>
          <h1 style={{flex: 1}}>&nbsp;Huishoudboekjes</h1>
          <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={navigateToGearchiveerdeHuishoudboekjes}>Archief</Button>
          <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={toevoegen}>Toevoegen</Button>
        </div>
    );
}