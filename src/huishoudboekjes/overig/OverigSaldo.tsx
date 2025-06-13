import { useOverigSaldo } from "./_hooks/useOverigSaldo";

interface OverigSaldoParameters {
  huishoudboekjeId: string;
  maand: number;
}

const OverigSaldo: React.FC<OverigSaldoParameters> = ({
  huishoudboekjeId,
  maand,
}) => {
  const { totalInkomsten, totalUitgaven } = useOverigSaldo(
    huishoudboekjeId,
    maand
  );

  return (
    <span style={{ fontSize: "30px" }}>
      Saldo voor de maand: {totalInkomsten - totalUitgaven}
    </span>
  );
};

export default OverigSaldo;
