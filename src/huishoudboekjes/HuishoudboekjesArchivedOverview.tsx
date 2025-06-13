import React from "react";
import { HuishoudboekjeArchivedRow } from "./_components/HuishoudboekjeArchivedRow";
import { HuishoudboekjeArchivedToolbar } from "./_components/HuishoudboekjeArchivedToolbar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useHuishoudboekjesArchived } from "./_hooks/useHuishoudboekjesArchived";

const HuishoudboekjeOverview: React.FC = () => {
  const { items, loading, error } = useHuishoudboekjesArchived();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableContainer component={Paper}>
      <HuishoudboekjeArchivedToolbar />
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
            .filter((entry) => entry.isDeleted)
            .map((entry) => (
              <HuishoudboekjeArchivedRow entry={entry} key={entry.id} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HuishoudboekjeOverview;
