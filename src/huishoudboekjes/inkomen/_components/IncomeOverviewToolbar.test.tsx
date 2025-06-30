import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IncomeOverviewToolbar } from "./IncomeOverviewToolbar";

describe("IncomeOverviewToolbar", () => {
  it("renders title and add button", () => {
    const handleOpen = jest.fn();
    render(<IncomeOverviewToolbar handleOpen={handleOpen} isOwner={true} />);
    expect(screen.getByText(/inkomsten/i)).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /toevoegen/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleOpen).toHaveBeenCalled();
  });
});
