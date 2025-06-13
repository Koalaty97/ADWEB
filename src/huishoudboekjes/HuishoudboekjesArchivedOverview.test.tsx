import React from "react";
import { render, screen } from "@testing-library/react";
import HuishoudboekjeOverview from "./HuishoudboekjesArchivedOverview";
import { useHuishoudboekjesArchived } from "./_hooks/useHuishoudboekjesArchived";

jest.mock("./_hooks/useHuishoudboekjesArchived");
jest.mock("./_components/HuishoudboekjeArchivedRow", () => ({
  HuishoudboekjeArchivedRow: ({ entry }: any) => (
    <tr data-testid="archived-row">
      <td>{entry.naam}</td>
      <td>{entry.omschrijving}</td>
    </tr>
  ),
}));
jest.mock("./_components/HuishoudboekjeArchivedToolbar", () => ({
  HuishoudboekjeArchivedToolbar: () => <div data-testid="archived-toolbar" />,
}));

describe("HuishoudboekjesArchivedOverview", () => {
  it("shows loading", () => {
    (useHuishoudboekjesArchived as jest.Mock).mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });
    render(<HuishoudboekjeOverview />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error", () => {
    (useHuishoudboekjesArchived as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: { message: "fail" },
    });
    render(<HuishoudboekjeOverview />);
    expect(screen.getByText(/error: fail/i)).toBeInTheDocument();
  });

  it("renders table with only deleted items", () => {
    (useHuishoudboekjesArchived as jest.Mock).mockReturnValue({
      items: [
        { id: "1", naam: "A", omschrijving: "O1", isDeleted: true },
        { id: "2", naam: "B", omschrijving: "O2", isDeleted: false },
      ],
      loading: false,
      error: null,
    });
    render(<HuishoudboekjeOverview />);
    expect(screen.getByTestId("archived-toolbar")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("O1")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();
  });
});
