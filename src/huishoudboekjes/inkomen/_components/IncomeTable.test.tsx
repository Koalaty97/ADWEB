import React from "react";
import { render, screen } from "@testing-library/react";
import { IncomeTable } from "./IncomeTable";
import { Inkomst } from "../../../models/Inkomst";
import { Timestamp } from "firebase/firestore";
import { Categorie } from "../../../models/Categorie";

jest.mock("./IncomeOverviewRow", () => ({
  IncomeRow: (props: any) => (
    <tr data-testid="income-row">
      <td>{props.inkomen.hoeveelheid}</td>
    </tr>
  ),
}));

describe("IncomeTable", () => {
  it("renders table headers and rows", () => {
    const inkomsten: Inkomst[] = [
      {
        id: "i1",
        hoeveelheid: 10,
        datum: Timestamp.fromDate(new Date()),
        categorieId: "cat1",
        huishoudboekjeId: "hb1",
        maand: 1,
      },
      {
        id: "i1",
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
        budgetIn: 0,
        budgetOut: 0,
        budgetRemaining: 0,
        huishoudboekjeId: "123",
        naam: "Cat 1",
        maxbudget: 0,
      },
      {
        id: "cat2",
        budgetIn: 0,
        budgetOut: 0,
        budgetRemaining: 0,
        huishoudboekjeId: "123",
        naam: "Cat 2",
        maxbudget: 0,
      },
    ];

    render(
      <IncomeTable
        inkomsten={inkomsten}
        categorieen={categorieen}
        isOwner={true}
      />
    );
    expect(screen.getByText("Hoeveelheid")).toBeInTheDocument();
    expect(screen.getAllByTestId("income-row")).toHaveLength(2);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
