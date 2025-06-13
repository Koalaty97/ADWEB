import useFilteredUitgaven from "./_hooks/useFilteredUitgaven";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useCategorieen } from "./_hooks/useCategorieen";
import { useCategorieUitgaven } from "./_hooks/useCategorieUitgaven";

export interface CategorieUitgavenGraphParameters {
  huishoudboekjeId: string;
}

const CategorieUitgavenGraph: React.FC<CategorieUitgavenGraphParameters> = ({
  huishoudboekjeId,
}) => {
  const { items: categorieen } = useCategorieen(huishoudboekjeId);
  const categorieIds = useMemo(
    () => categorieen.map((cat) => cat.id),
    [categorieen],
  );
  const { items: uitgaven } = useFilteredUitgaven(categorieIds);
  const data = useCategorieUitgaven(categorieen, uitgaven);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" />
        <YAxis
          tickFormatter={(value) =>
            value.toLocaleString("nl-NL", {
              style: "currency",
              currency: "EUR",
            })
          }
        />
        <Tooltip
          formatter={(value: number) =>
            value.toLocaleString("nl-NL", {
              style: "currency",
              currency: "EUR",
            })
          }
        />
        <Bar dataKey="maxbudget" name="Maxbudget" fill="blue" />
        <Bar dataKey="remainingBudget" name="Budget over" fill="orange" />
        <Bar dataKey="uitgave" name="Uitgaven" fill="#8884d8" />
        <Bar dataKey="inkomen" name="Inkomen" fill="cyan" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategorieUitgavenGraph;
