import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HuishoudboekjeArchivedToolbar() {
    const navigate = useNavigate();

    const navigateToActieveHuishoudboekjes = () => {
      navigate("/huishoudboekjes");
    }

    return(
        <div style={{display: 'flex'}}>
          <h1 style={{flex: 1, marginLeft: 10}}>Gearchiveerde Huishoudboekjes</h1>
          <Button sx={{ alignSelf: 'anchor-center', mr: '10px' }} variant="contained" onClick={navigateToActieveHuishoudboekjes}>Actieve</Button>
        </div>
    );
}