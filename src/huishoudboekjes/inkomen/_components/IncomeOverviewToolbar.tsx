import { Box, Button, Typography } from "@mui/material";

export function IncomeOverviewToolbar({
  handleOpen,
  isOwner,
}: {
  handleOpen: () => void;
  isOwner: boolean;
}) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Typography variant="h4">Inkomsten</Typography>
      {isOwner && (
        <Button
          sx={{ alignSelf: "anchor-center" }}
          variant="contained"
          onClick={handleOpen}
        >
          Toevoegen
        </Button>
      )}
    </Box>
  );
}
