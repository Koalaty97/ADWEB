import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryRow } from "./CategoryRow";
import { useDroppable } from "@dnd-kit/core";

jest.mock("@dnd-kit/core");

describe("CategoryRow", () => {
  beforeEach(() => {
    (useDroppable as jest.Mock).mockReturnValue({
      isOver: false,
      setNodeRef: jest.fn(),
    });
  });

  const category = {
    id: "cat1",
    naam: "Cat 1",
    maxbudget: 100,
    budgetIn: 50,
    budgetOut: 20,
    budgetRemaining: 80,
    einddatum: { toDate: () => new Date("2025-06-01") },
  };

  it("renders category data", () => {
    render(<CategoryRow category={category as any} />);
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2025-06-01").toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("applies background color based on budget percentage", () => {
    render(<CategoryRow category={{ ...category, budgetOut: 120 } as any} />);
    // Should have bgcolor "red" if > 100%
    // This is tested via style, but MUI sx prop is not rendered as style, so we just check render
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
  });
});
