import { useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { HuishoudboekjeSchema } from "../../models/Huishoudboekje";
import { AddHuishoudboekje } from "../../services/huishoudboekjeService";
import * as yup from "yup";

export function useAddHuishoudboekje() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addBoekje = useCallback(
    async (data: { naam: string; omschrijving: string }) => {
      setLoading(true);
      setError(null);
      try {
        HuishoudboekjeSchema.validateSync(data);
        await AddHuishoudboekje({
          ...data,
          ownerId: user!.id,
          participants: [],
        });
      } catch (e) {
        if (e instanceof yup.ValidationError) {
          setError(e.errors.join("\n"));
        } else {
          setError("Kon niet opslaan. Probeer het later opnieuw.");
        }
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return { addBoekje, loading, error };
}
