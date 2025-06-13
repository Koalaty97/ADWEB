import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InkomenOverview from "./InkomenOverview";
import useCategorieen from "../categorieen/_hooks/useCategorieen";
import { useInkomenData } from "./_hooks/useInkomenData";

jest.mock("../categorieen/_hooks/useCategorieen");
jest.mock("./_hooks/useInkomenData");
jest.mock("./_components/IncomeTable", () => ({
  IncomeTable: (props: any) => <div data-testid="income-table" {...props} />,
}));
jest.mock("./_components/AddInkomstModal", () => ({
  AddInkomstModal: (props: any) =>
    props.open ? <button onClick={props.onClose}>CloseModal</button> : null,
}));
jest.mock("./_components/IncomeOverviewToolbar", () => ({
  IncomeOverviewToolbar: ({ handleOpen }: any) => (
    <button onClick={handleOpen}>OpenModal</button>
  ),
}));

describe("InkomenOverview", () => {
  beforeEach(() => {
    (useCategorieen as jest.Mock).mockReturnValue({
      items: [{ id: "cat1", naam: "Categorie 1" }],
    });
    (useInkomenData as jest.Mock).mockReturnValue({
      inkomsten: [
        {
          id: "i1",
          hoeveelheid: 10,
          datum: { toDate: () => new Date() },
          categorieId: "cat1",
        },
      ],
      loading: false,
      error: null,
      add: jest.fn(),
    });
  });

  it("shows loading", () => {
    (useInkomenData as jest.Mock).mockReturnValueOnce({
      inkomsten: [],
      loading: true,
      error: null,
      add: jest.fn(),
    });
    render(<InkomenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error", () => {
    (useInkomenData as jest.Mock).mockReturnValueOnce({
      inkomsten: [],
      loading: false,
      error: { message: "fail" },
      add: jest.fn(),
    });
    render(<InkomenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByText(/fail/i)).toBeInTheDocument();
  });

  it("renders table and can open/close modal", () => {
    render(<InkomenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByTestId("income-table")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /openmodal/i }));
    expect(screen.getByText(/closemodal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/closemodal/i));
    expect(screen.queryByText(/closemodal/i)).not.toBeInTheDocument();
  });
});
