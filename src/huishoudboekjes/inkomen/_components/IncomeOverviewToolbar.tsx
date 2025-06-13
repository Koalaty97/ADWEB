import { Box, Button, Typography } from "@mui/material";

export function IncomeOverviewToolbar({
  handleOpen,
}: {
  handleOpen: () => void;
}) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Typography variant="h4">Inkomsten</Typography>
      <Button
        sx={{ alignSelf: "anchor-center" }}
        variant="contained"
        onClick={handleOpen}
      >
        Toevoegen
      </Button>
    </Box>
  );
}
