import React from "react";
import { render, screen } from "@testing-library/react";
import OverigSaldo from "./OverigSaldo";
import { useOverigSaldo } from "./_hooks/useOverigSaldo";

jest.mock("./_hooks/useOverigSaldo");

describe("OverigSaldo", () => {
  it("renders saldo for the month", () => {
    (useOverigSaldo as jest.Mock).mockReturnValue({
      totalInkomsten: 200,
      totalUitgaven: 50,
    });
    render(<OverigSaldo huishoudboekjeId="h1" maand={1} />);
    expect(screen.getByText(/saldo voor de maand/i)).toHaveTextContent("150");
  });

  it("renders saldo 0 if no inkomsten/uitgaven", () => {
    (useOverigSaldo as jest.Mock).mockReturnValue({
      totalInkomsten: 0,
      totalUitgaven: 0,
    });
    render(<OverigSaldo huishoudboekjeId="h1" maand={1} />);
    expect(screen.getByText(/saldo voor de maand/i)).toHaveTextContent("0");
  });
});
