import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { HuishoudboekjeRow } from "./_components/HuishoudboekjeRow";
import { HuishoudboekjeToolbar } from "./_components/HuishoudboekjeToolbar";
import { useHuishoudboekjes } from "./_hooks/useHuishoudboekjes";

const HuishoudboekjesOverview: React.FC = () => {
  const { items, loading, error } = useHuishoudboekjes();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableContainer component={Paper}>
      <HuishoudboekjeToolbar />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Naam</TableCell>
            <TableCell>Omschrijving</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items
            .filter((entry) => !entry.isDeleted)
            .map((entry) => (
              <HuishoudboekjeRow entry={entry} key={entry.id} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HuishoudboekjesOverview;
