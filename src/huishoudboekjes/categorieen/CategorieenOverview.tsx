import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { AddCategorieModal } from "./_components/AddCategorieModal";
import { CategoryTable } from "./_components/CategoryTable";
import { useCategorieData } from "./_hooks/useCategorieData";

export interface CategorieOverviewParameters {
  huishoudboekjeId: string;
  isOwner: boolean;
}

export function CategorieOverview({
  huishoudboekjeId,
  isOwner,
}: CategorieOverviewParameters) {
  const { categories, loading, loadError, add } =
    useCategorieData(huishoudboekjeId);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return <Typography>Loading…</Typography>;
  }
  if (loadError) {
    return <Typography color="error">{loadError.message}</Typography>;
  }

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Categorieën</Typography>
        {isOwner && (
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Toevoegen
          </Button>
        )}
      </Box>
      <CategoryTable categories={categories} isOwner={isOwner} />
      <AddCategorieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={add}
      />
    </div>
  );
}

export default CategorieOverview;
