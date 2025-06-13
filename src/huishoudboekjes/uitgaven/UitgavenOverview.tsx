import useCategorieen from "../categorieen/_hooks/useCategorieen";
import { AddUitgaveModal } from "./_components/AddUitgaveModal";
import { Box, Button, Typography } from "@mui/material";
import { UitgavenTable } from "./_components/UitgavenTable";
import { useState } from "react";
import { useUitgavenData } from "./_hooks/useUitgavenData";

export function UitgavenOverview({ huishoudboekjeId, isOwner, maand }: any) {
  const { uitgaven, loading, loadError, add } = useUitgavenData(
    huishoudboekjeId,
    maand
  );
  const { items: categorieen } = useCategorieen(huishoudboekjeId);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return <Typography>Loading…</Typography>;
  if (loadError)
    return <Typography color="error">{loadError.message}</Typography>;

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Uitgaven</Typography>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Toevoegen
        </Button>
      </Box>
      <UitgavenTable
        uitgaven={uitgaven}
        categorieen={categorieen}
        isOwner={isOwner}
      />
      <AddUitgaveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categorieen={categorieen}
        onAdd={add}
      />
    </div>
  );
}

export default UitgavenOverview;
