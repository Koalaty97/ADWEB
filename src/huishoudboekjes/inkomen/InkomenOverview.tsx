import { useState } from "react";
import { Typography } from "@mui/material";
import useCategorieen from "../categorieen/_hooks/useCategorieen";
import { AddInkomstModal } from "./_components/AddInkomstModal";
import { IncomeOverviewToolbar } from "./_components/IncomeOverviewToolbar";
import { IncomeTable } from "./_components/IncomeTable";
import { useInkomenData } from "./_hooks/useInkomenData";

export interface InkomenOverviewParameters {
  huishoudboekjeId: string;
  isOwner: boolean;
  maand: number;
}

export function InkomenOverview({
  huishoudboekjeId,
  isOwner,
  maand,
}: InkomenOverviewParameters) {
  const {
    inkomsten,
    loading,
    error: loadError,
    add,
  } = useInkomenData(huishoudboekjeId, maand);
  const { items: categorieen } = useCategorieen(huishoudboekjeId);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return <Typography>Loading…</Typography>;
  }

  if (loadError) {
    return <Typography color="error">{loadError.message}</Typography>;
  }
  return (
    <div style={{ width: "100%" }}>
      <IncomeOverviewToolbar
        handleOpen={() => setModalOpen(true)}
        isOwner={isOwner}
      />
      <IncomeTable
        inkomsten={inkomsten}
        categorieen={categorieen}
        isOwner={isOwner}
      />
      <AddInkomstModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categorieen={categorieen}
        onAdd={add}
      />
    </div>
  );
}

export default InkomenOverview;
