import React from "react";
import { render, screen, fireEvent, waitFor } from "../../test-utils";
import { AddUitgaveModal } from "./AddUitgaveModal";
import { UitgaveSchema } from "../../../models/Uitgave";
import { Categorie } from "../../../models/Categorie";

jest.mock("../../../models/Uitgave", () => ({
  UitgaveSchema: { validateSync: jest.fn() },
}));

describe("AddUitgaveModal", () => {
  const categorieen: Categorie[] = [
    {
      id: "cat1",
      budgetIn: 0,
      budgetOut: 0,
      budgetRemaining: 0,
      huishoudboekjeId: "123",
      naam: "Cat 1",
      maxbudget: 0,
    },
  ];
  const onAdd = jest.fn().mockResolvedValue(undefined);
  const onClose = jest.fn();

  beforeEach(() => {
    (UitgaveSchema.validateSync as jest.Mock).mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders fields and calls onAdd and onClose on valid submit", async () => {
    render(
      <AddUitgaveModal
        open={true}
        onClose={onClose}
        categorieen={categorieen}
        onAdd={onAdd}
      />
    );
    fireEvent.change(screen.getByLabelText(/hoeveelheid/i), {
      target: { value: "42" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/categorie/i));
    fireEvent.click(screen.getByText("Cat 1"));
    fireEvent.click(screen.getByRole("button", { name: /aanmaken/i }));
    await waitFor(() => {
      expect(onAdd).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
