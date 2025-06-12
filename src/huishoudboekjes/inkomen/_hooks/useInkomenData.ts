import { useState } from 'react';
import { useNotifier } from '../../../contexts/NotificationContext';
import { Inkomst } from '../../../models/Inkomst';
import { addInkomst } from '../../../services/inkomstenService';
import { useInkomen } from './useInkomen';

interface UseInkomenData {
  inkomsten: Inkomst[];
  loading: boolean;
  error: Error | null;
  formError: string;
  add: (hoeveelheid: number, datum: Date, categorieId: string) => Promise<void>;
}

export function useInkomenData(
  huishoudboekjeId: string,
  maand: number
): UseInkomenData {
  const { items: inkomsten, loading, error: loadError } = useInkomen(
    huishoudboekjeId,
    maand
  );
  const [formError, setFormError] = useState<string>('');
  const { notify } = useNotifier();

  async function add(
    hoeveelheid: number,
    datum: Date,
    categorieId: string
  ) {
    try {
      setFormError('');
      await addInkomst({ hoeveelheid, datum, categorieId, huishoudboekjeId });
      notify('Inkomst succesvol toegevoegd');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Fout bij opslaan van inkomst'
      );
    }
  }

  return { inkomsten, loading, error: loadError, formError, add };
}