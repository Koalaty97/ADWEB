import { query, where } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCollection } from "../../hooks/useCollection";
import { Inkomst, mapInkomstenToTransactions } from "../../models/Inkomst";
import { mapUitgavenToTransactions, Uitgave } from "../../models/Uitgave";
import { collectionInkomsten, collectionUitgaven, db } from "../../firebase";

export interface InkomstenUitgavenGraphParameters {
  huishoudboekjeId: string;
  maand: number;
}

export interface Transaction {
  date: string; // ISO date string, e.g. "2025-06-01"
  hoeveelheid: number;
}

export function dailySeries(
  inkomsten: Transaction[],
  uitgaven: Transaction[],
  year: number,
  month: number, // 1–12
) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const map: Record<string, { income: number; expense: number }> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(
      2,
      "0",
    )}`;
    map[key] = { income: 0, expense: 0 };
  }

  const accumulate = (arr: Transaction[], field: "income" | "expense") =>
    arr.forEach(({ date, hoeveelheid }) => {
      const day = date.slice(0, 10);
      if (map[day]) map[day][field] += hoeveelheid;
    });

  accumulate(inkomsten, "income");
  accumulate(uitgaven, "expense");

  return Object.entries(map)
    .map(([date, { income, expense }]) => ({ date, income, expense }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

const InkomstenUitgavenGraph: React.FC<InkomstenUitgavenGraphParameters> = ({
  huishoudboekjeId,
  maand,
}) => {
  const qFn = useCallback(
    (ref: any) =>
      query(
        ref,
        where("huishoudboekjeId", "==", huishoudboekjeId),
        where("maand", "==", maand),
      ),
    [maand],
  );

  const { items: inkomsten } = useCollection<Inkomst>(
    db,
    collectionInkomsten,
    qFn,
  );
  const { items: uitgaven } = useCollection<Uitgave>(
    db,
    collectionUitgaven,
    qFn,
  );

  const data = useMemo(
    () =>
      dailySeries(
        mapInkomstenToTransactions(inkomsten),
        mapUitgavenToTransactions(uitgaven),
        new Date().getFullYear(),
        maand,
      ),
    [inkomsten, uitgaven, maand],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(str) => str.slice(-2)}
          interval={Math.floor(data.length / 7)}
        />
        <YAxis
          tickFormatter={(n) =>
            n.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })
          }
        />
        <Tooltip
          labelFormatter={(label) => `Dag ${label.slice(-2)}`}
          formatter={(value: number) =>
            value.toLocaleString("nl-NL", {
              style: "currency",
              currency: "EUR",
            })
          }
        />
        <Legend verticalAlign="top" />
        <Line
          type="monotone"
          dataKey="income"
          name="Inkomen"
          stroke="#4caf50"
          dot={false}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="expense"
          name="Uitgaven"
          stroke="#f44336"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InkomstenUitgavenGraph;
