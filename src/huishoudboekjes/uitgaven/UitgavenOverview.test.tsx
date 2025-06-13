import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UitgavenOverview from "./UitgavenOverview";
import useCategorieen from "../categorieen/_hooks/useCategorieen";
import { useUitgavenData } from "./_hooks/useUitgavenData";

jest.mock("../categorieen/_hooks/useCategorieen");
jest.mock("./_hooks/useUitgavenData");
jest.mock("./_components/UitgavenTable", () => ({
  UitgavenTable: (props: any) => (
    <div data-testid="uitgaven-table" {...props} />
  ),
}));
jest.mock("./_components/AddUitgaveModal", () => ({
  AddUitgaveModal: (props: any) =>
    props.open ? <button onClick={props.onClose}>CloseModal</button> : null,
}));

describe("UitgavenOverview", () => {
  beforeEach(() => {
    (useCategorieen as jest.Mock).mockReturnValue({
      items: [{ id: "cat1", naam: "Categorie 1" }],
    });
    (useUitgavenData as jest.Mock).mockReturnValue({
      uitgaven: [
        {
          id: "u1",
          hoeveelheid: 10,
          datum: { toDate: () => new Date() },
          categorieId: "cat1",
        },
      ],
      loading: false,
      loadError: null,
      add: jest.fn(),
    });
  });

  it("shows loading", () => {
    (useUitgavenData as jest.Mock).mockReturnValueOnce({
      uitgaven: [],
      loading: true,
      loadError: null,
      add: jest.fn(),
    });
    render(<UitgavenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error", () => {
    (useUitgavenData as jest.Mock).mockReturnValueOnce({
      uitgaven: [],
      loading: false,
      loadError: { message: "fail" },
      add: jest.fn(),
    });
    render(<UitgavenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByText(/fail/i)).toBeInTheDocument();
  });

  it("renders table and can open/close modal", () => {
    render(<UitgavenOverview huishoudboekjeId="h1" maand={1} isOwner />);
    expect(screen.getByTestId("uitgaven-table")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /toevoegen/i }));
    expect(screen.getByText(/closemodal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/closemodal/i));
    expect(screen.queryByText(/closemodal/i)).not.toBeInTheDocument();
  });
});
