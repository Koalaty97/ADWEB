import { render, screen, fireEvent } from "@testing-library/react";
import { ParticipantsTable } from "./ParticipantsTable";

jest.mock("./ParticipantsOverviewRow", () => ({
  ParticipantOverviewRow: ({ email }: any) => (
    <tr data-testid="row">
      <td>{email}</td>
    </tr>
  ),
}));

describe("ParticipantsTable", () => {
  it("renders participants and add button", () => {
    const onAddClick = jest.fn();
    render(
      <ParticipantsTable
        participants={["a@b.com", "b@c.com"]}
        onAddClick={onAddClick}
        isOwner={true}
      />
    );
    expect(screen.getByText(/leden/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("row")).toHaveLength(2);
    expect(screen.getByText("a@b.com")).toBeInTheDocument();
    expect(screen.getByText("b@c.com")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /toevoegen/i }));
    expect(onAddClick).toHaveBeenCalled();
  });
});
