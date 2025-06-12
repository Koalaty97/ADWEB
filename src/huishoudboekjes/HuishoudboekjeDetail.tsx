import { Typography, Box } from "@mui/material";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DetailGrid } from "./_components/DetailGrid";
import { MonthSelector } from "./_components/MonthSelector";
import { useHuishoudboekjeDetail } from "./_hooks/useHuishoudboekjeDetail";
import { IsOwner } from "../models/Huishoudboekje";

const DetailHuishoudboekjePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [maand, setMaand] = useState(new Date().getMonth() + 1);
  const { user } = useAuth();

  const { huishoudboekje, loading, error, handleDragEnd } = useHuishoudboekjeDetail({ id: id! });
  const isOwner = useMemo(() => {
    if (!huishoudboekje || !user)
    {
      return false;
    }
    return huishoudboekje && user && IsOwner(huishoudboekje!, user!.id)
  }, [huishoudboekje, user]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error || !huishoudboekje) return <Typography color="error">Niet gevonden</Typography>;

  return (
    <Box className="rows">
      <MonthSelector maand={maand} onChange={setMaand} />
      <DetailGrid
        huishoudboekje={huishoudboekje}
        maand={maand}
        isOwner={isOwner}
        onDragEnd={handleDragEnd}
      />
    </Box>
  );
};

export default DetailHuishoudboekjePage;