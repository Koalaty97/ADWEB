import { useState } from 'react';
import { useCategorieen } from './useCategorieen';
import { useNotifier } from '../../../contexts/NotificationContext';
import { addCategorie } from '../../../services/categorieService';

export function useCategorieData(huishoudboekjeId: string) {
  const { items: categories, loading, error: loadError } = useCategorieen(huishoudboekjeId);
  const [formError, setFormError] = useState<string>('');
  const { notify } = useNotifier();

  async function add(naam: string, maxbudget: number, einddatum: Date | undefined) {
    try {
      setFormError('');
      await addCategorie({ naam, maxbudget, einddatum, huishoudboekjeId });
      notify('Categorie succesvol toegevoegd');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Fout bij opslaan van categorie'
      );
    }
  }

  return { categories, loading, loadError, formError, add };
}