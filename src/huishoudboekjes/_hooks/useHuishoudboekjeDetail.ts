import { useCallback } from "react";
import { db, collectionHuishoudboekjes } from "../../firebase";
import { useDocument } from "../../hooks/useDocument";
import { Huishoudboekje } from "../../models/Huishoudboekje";
import { updateInkomstCategorie } from "../../services/inkomstenService";
import { updateUitgaveCategorie } from "../../services/uitgavenService";

interface UseHuishoudboekjeDetailParams {
  id: string;
}

export function useHuishoudboekjeDetail({ id }: UseHuishoudboekjeDetailParams) {
  const { data: huishoudboekje, loading, error } = useDocument<Huishoudboekje>(
    db,
    [collectionHuishoudboekjes, id]
  );

  const handleDragEnd = useCallback(async (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;
    const source = active.data.current?.source as 'inkomens' | 'uitgaven';
    const targetId = over.id as string;
    const itemId = active.id.toString();
    if (source === 'inkomens') {
      await updateInkomstCategorie(itemId, targetId);
    } else if (source === 'uitgaven') {
      await updateUitgaveCategorie(itemId, targetId);
    }
  }, []);

  return { huishoudboekje, loading, error, handleDragEnd };
}