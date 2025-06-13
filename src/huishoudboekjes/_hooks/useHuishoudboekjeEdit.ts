import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Huishoudboekje } from "../../models/Huishoudboekje";
import {
  GetHuishoudboekjeById,
  UpdateHuishoudboekje,
} from "../../services/huishoudboekjeService";

export function useHuishoudboekjeEdit(id: string) {
  const { user } = useAuth();
  const [boekje, setBoekje] = useState<Huishoudboekje | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoekje = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetHuishoudboekjeById(id, user!.id);
      if (!data) throw new Error(`Huishoudboekje ${id} niet gevonden`);
      setBoekje(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  const updateBoekje = useCallback(
    async (updates: Partial<Huishoudboekje>) => {
      if (!boekje) return;
      const updated = { ...boekje, ...updates };
      await UpdateHuishoudboekje(updated);
      setBoekje(updated);
    },
    [boekje]
  );

  useEffect(() => {
    fetchBoekje();
  }, [fetchBoekje]);

  return { boekje, loading, error, updateBoekje };
}
