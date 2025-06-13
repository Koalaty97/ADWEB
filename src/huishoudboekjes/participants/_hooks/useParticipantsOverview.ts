import { useState, useCallback } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { AddHuishoudeboekjeParticipant } from "../../../services/huishoudboekjeService";
import * as yup from "yup";

const participantSchema = yup.object({
  email: yup.string().required().email(),
});

export function useParticipantsOverview(huishoudboekjeId: string) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setEmail("");
    setError(null);
  };

  const addParticipant = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      participantSchema.validateSync({ email });
      await AddHuishoudeboekjeParticipant(huishoudboekjeId, user!.id, email);
      closeModal();
      return true;
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        setError(e.errors.join("\n"));
      } else {
        setError("Gebruiker niet kunnen toevoegen");
        console.error(e);
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, huishoudboekjeId, user]);

  return {
    open,
    email,
    error,
    loading,
    openModal,
    closeModal,
    setEmail,
    addParticipant,
  };
}
