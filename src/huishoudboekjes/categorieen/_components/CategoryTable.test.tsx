import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryTable } from "./CategoryTable";

jest.mock("./CategoryRow", () => ({
  CategoryRow: (props: any) => (
    <tr data-testid="category-row">
      <td>{props.category.naam}</td>
    </tr>
  ),
}));

describe("CategoryTable", () => {
  it("renders table headers and rows", () => {
    const categories = [
      { id: "cat1", naam: "Cat 1" },
      { id: "cat2", naam: "Cat 2" },
    ];
    render(<CategoryTable categories={categories as any} isOwner={true} />);
    expect(screen.getByText("Naam")).toBeInTheDocument();
    expect(screen.getAllByTestId("category-row")).toHaveLength(2);
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
    expect(screen.getByText("Cat 2")).toBeInTheDocument();
  });
});
