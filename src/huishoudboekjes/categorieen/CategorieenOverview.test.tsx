import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategorieOverview from "./CategorieenOverview";
import * as useCategorieDataModule from "./_hooks/useCategorieData";

jest.mock("./_hooks/useCategorieData");
jest.mock("./_components/CategoryTable", () => ({
  CategoryTable: ({ categories }: any) => (
    <div data-testid="category-table">{categories.length} categories</div>
  ),
}));
jest.mock("./_components/AddCategorieModal", () => ({
  AddCategorieModal: (props: any) =>
    props.open ? <button onClick={props.onClose}>CloseModal</button> : null,
}));

describe("CategorieOverview", () => {
  beforeEach(() => {
    (useCategorieDataModule.useCategorieData as jest.Mock).mockReturnValue({
      categories: [{ id: "cat1", naam: "Cat 1" }],
      loading: false,
      loadError: null,
      add: jest.fn(),
    });
  });

  it("shows loading", () => {
    (useCategorieDataModule.useCategorieData as jest.Mock).mockReturnValueOnce({
      categories: [],
      loading: true,
      loadError: null,
      add: jest.fn(),
    });
    render(<CategorieOverview huishoudboekjeId="h1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error", () => {
    (useCategorieDataModule.useCategorieData as jest.Mock).mockReturnValueOnce({
      categories: [],
      loading: false,
      loadError: { message: "fail" },
      add: jest.fn(),
    });
    render(<CategorieOverview huishoudboekjeId="h1" />);
    expect(screen.getByText(/fail/i)).toBeInTheDocument();
  });

  it("renders table and can open/close modal", () => {
    render(<CategorieOverview huishoudboekjeId="h1" />);
    expect(screen.getByTestId("category-table")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /toevoegen/i }));
    expect(screen.getByText(/closemodal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/closemodal/i));
    expect(screen.queryByText(/closemodal/i)).not.toBeInTheDocument();
  });
});
