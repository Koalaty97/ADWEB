import React from "react";
import { render } from "@testing-library/react";
import InkomstenUitgavenGraph, { dailySeries } from "./InkomstenUitgavenGraph";
import * as useCollectionModule from "../../hooks/useCollection";

jest.mock("../../hooks/useCollection");

describe("dailySeries", () => {
  it("returns correct daily series", () => {
    const inkomsten = [
      { date: "2025-06-01", hoeveelheid: 10 },
      { date: "2025-06-02", hoeveelheid: 20 },
    ];
    const uitgaven = [
      { date: "2025-06-01", hoeveelheid: 5 },
      { date: "2025-06-03", hoeveelheid: 15 },
    ];
    const result = dailySeries(inkomsten, uitgaven, 2025, 6);
    expect(result.find((d) => d.date === "2025-06-01")).toEqual({
      date: "2025-06-01",
      income: 10,
      expense: 5,
    });
    expect(result.find((d) => d.date === "2025-06-02")).toEqual({
      date: "2025-06-02",
      income: 20,
      expense: 0,
    });
    expect(result.find((d) => d.date === "2025-06-03")).toEqual({
      date: "2025-06-03",
      income: 0,
      expense: 15,
    });
  });
});
