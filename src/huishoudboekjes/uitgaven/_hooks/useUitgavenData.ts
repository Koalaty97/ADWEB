import { useState } from 'react';
import { useUitgaven } from './useUitgaven';
import { useNotifier } from '../../../contexts/NotificationContext';
import { addUitgave } from '../../../services/uitgavenService';

export function useUitgavenData(huishoudboekjeId: string, maand: number) {
  const { items: uitgaven, loading, error: loadError } = useUitgaven(huishoudboekjeId, maand);
  const [formError, setFormError] = useState<string>("");
  const { notify } = useNotifier();

  async function add(hoeveelheid: number, datum: Date, categorieId: string) {
    try {
      setFormError("");
      await addUitgave({ hoeveelheid, datum, categorieId, huishoudboekjeId });
      notify("Uitgave succesvol toegevoegd");
    } catch (err) {
      setFormError(typeof err === 'string' ? err : 'Fout bij opslaan');
    }
  }

  return { uitgaven, loading, loadError, formError, add };
}