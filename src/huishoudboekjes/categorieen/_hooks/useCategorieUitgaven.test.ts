import { useCategorieUitgaven } from "./useCategorieUitgaven";

describe("useCategorieUitgaven", () => {
  it("maps categories and sums uitgaven per category", () => {
    const categorieen = [
      {
        id: "cat1",
        naam: "Cat 1",
        budgetIn: 100,
        maxbudget: 200,
        budgetRemaining: 150,
      },
      {
        id: "cat2",
        naam: "Cat 2",
        budgetIn: 50,
        maxbudget: 100,
        budgetRemaining: 80,
      },
    ];
    const uitgaven = [
      { id: "u1", hoeveelheid: 10, categorieId: "cat1" },
      { id: "u2", hoeveelheid: 20, categorieId: "cat1" },
      { id: "u3", hoeveelheid: 5, categorieId: "cat2" },
    ];
    const result = useCategorieUitgaven(categorieen as any, uitgaven as any);
    expect(result).toEqual([
      {
        naam: "Cat 1",
        inkomen: 100,
        maxbudget: 200,
        remainingBudget: 150,
        uitgave: 30,
      },
      {
        naam: "Cat 2",
        inkomen: 50,
        maxbudget: 100,
        remainingBudget: 80,
        uitgave: 5,
      },
    ]);
  });

  it("returns 0 uitgave if no uitgaven for category", () => {
    const categorieen = [
      {
        id: "cat1",
        naam: "Cat 1",
        budgetIn: 100,
        maxbudget: 200,
        budgetRemaining: 150,
      },
    ];
    const uitgaven: any[] = [];
    const result = useCategorieUitgaven(categorieen as any, uitgaven as any);
    expect(result[0].uitgave).toBe(0);
  });
});
