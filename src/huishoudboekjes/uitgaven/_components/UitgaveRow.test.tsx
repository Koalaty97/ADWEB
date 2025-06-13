import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UitgaveRow } from "./UitgaveRow";
import * as uitgavenService from "../../../services/uitgavenService";
import { useDraggable } from "@dnd-kit/core";
import { Uitgave } from "../../../models/Uitgave";
import { Timestamp } from "firebase/firestore";
import { Categorie } from "../../../models/Categorie";

jest.mock("@dnd-kit/core");
jest.mock("../../../services/uitgavenService");

describe("UitgaveRow", () => {
  beforeEach(() => {
    (useDraggable as jest.Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
    });
  });

  const uitgave: Uitgave = {
    id: "u1",
    hoeveelheid: 10,
    datum: Timestamp.fromDate(new Date("2024-01-01")),
    categorieId: "cat1",
    huishoudboekjeId: "hb1",
    maand: 1,
  };

  const categorieen: Categorie[] = [
    {
      id: "cat1",
      naam: "Cat 1",
      budgetIn: 0,
      budgetOut: 0,
      budgetRemaining: 0,
      huishoudboekjeId: "hb1",
      maxbudget: 0,
    },
  ];

  it("renders uitgave data", () => {
    render(
      <UitgaveRow uitgaven={uitgave} categorieen={categorieen} isOwner={true} />
    );
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2024-01-01").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("Cat 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /verwijderen/i })
    ).toBeInTheDocument();
  });

  it("calls deleteUitgave on verwijderen", async () => {
    const mockDelete = uitgavenService.deleteUitgave as jest.Mock;
    mockDelete.mockResolvedValue({});
    render(
      <UitgaveRow uitgaven={uitgave} categorieen={categorieen} isOwner={true} />
    );
    fireEvent.click(screen.getByRole("button", { name: /verwijderen/i }));
    expect(mockDelete).toHaveBeenCalledWith("u1");
  });

  it("does not render delete button if not owner", () => {
    render(
      <UitgaveRow
        uitgaven={uitgave}
        categorieen={categorieen}
        isOwner={false}
      />
    );
    expect(
      screen.queryByRole("button", { name: /verwijderen/i })
    ).not.toBeInTheDocument();
  });
});
