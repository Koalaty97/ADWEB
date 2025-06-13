import React from "react";
import { render, screen, fireEvent, waitFor } from "../../test-utils";
import { AddCategorieModal } from "./AddCategorieModal";
import { categorieSchema } from "../../../models/Categorie";

jest.mock("../../../models/Categorie", () => ({
  categorieSchema: { validateSync: jest.fn() },
}));

describe("AddCategorieModal", () => {
  const onAdd = jest.fn().mockResolvedValue(undefined);
  const onClose = jest.fn();

  beforeEach(() => {
    (categorieSchema.validateSync as jest.Mock).mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders fields and calls onAdd and onClose on valid submit", async () => {
    render(<AddCategorieModal open={true} onClose={onClose} onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/max budget/i), {
      target: { value: "42" },
    });
    fireEvent.click(screen.getByRole("button", { name: /aanmaken/i }));
    await waitFor(() => {
      expect(onAdd).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
