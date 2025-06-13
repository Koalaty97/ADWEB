import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IncomeRow } from "./IncomeOverviewRow";
import * as inkomstenService from "../../../services/inkomstenService";
import { useDraggable } from "@dnd-kit/core";
import { Inkomst } from "../../../models/Inkomst";
import { Timestamp } from "firebase/firestore";
import { Categorie } from "../../../models/Categorie";

jest.mock("@dnd-kit/core");
jest.mock("../../../services/inkomstenService");

describe("IncomeRow", () => {
  beforeEach(() => {
    (useDraggable as jest.Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
    });
  });

  const inkomen: Inkomst = {
    id: "i1",
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

  it("renders inkomen data", () => {
    render(
      <IncomeRow inkomen={inkomen} categorieen={categorieen} isOwner={true} />
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

  it("calls deleteInkomst on verwijderen", async () => {
    const mockDelete = inkomstenService.deleteInkomst as jest.Mock;
    mockDelete.mockResolvedValue({});
    render(
      <IncomeRow inkomen={inkomen} categorieen={categorieen} isOwner={true} />
    );
    fireEvent.click(screen.getByRole("button", { name: /verwijderen/i }));
    expect(mockDelete).toHaveBeenCalledWith("i1");
  });

  it("does not render delete button if not owner", () => {
    render(
      <IncomeRow inkomen={inkomen} categorieen={categorieen} isOwner={false} />
    );
    expect(
      screen.queryByRole("button", { name: /verwijderen/i })
    ).not.toBeInTheDocument();
  });
});
