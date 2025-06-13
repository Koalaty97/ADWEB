import React from "react";
import { render, screen } from "@testing-library/react";
import { UitgavenTable } from "./UitgavenTable";
import { Uitgave } from "../../../models/Uitgave";
import { Timestamp } from "firebase/firestore";
import { Categorie } from "../../../models/Categorie";

jest.mock("./UitgaveRow", () => ({
  UitgaveRow: (props: any) => (
    <tr data-testid="uitgave-row">
      <td>{props.uitgaven.hoeveelheid}</td>
    </tr>
  ),
}));

describe("UitgavenTable", () => {
  it("renders table headers and rows", () => {
    const uitgaven: Uitgave[] = [
      {
        id: "u1",
        hoeveelheid: 10,
        datum: Timestamp.fromDate(new Date()),
        categorieId: "cat1",
        huishoudboekjeId: "hb1",
        maand: 1,
      },
      {
        id: "u2",
        hoeveelheid: 20,
        datum: Timestamp.fromDate(new Date()),
        categorieId: "cat2",
        huishoudboekjeId: "hb1",
        maand: 1,
      },
    ];
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
      {
        id: "cat2",
        naam: "Cat 2",
        budgetIn: 0,
        budgetOut: 0,
        budgetRemaining: 0,
        huishoudboekjeId: "hb1",
        maxbudget: 0,
      },
    ];
    render(
      <UitgavenTable
        uitgaven={uitgaven}
        categorieen={categorieen}
        isOwner={true}
      />
    );
    expect(screen.getByText("Hoeveelheid")).toBeInTheDocument();
    expect(screen.getAllByTestId("uitgave-row")).toHaveLength(2);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
