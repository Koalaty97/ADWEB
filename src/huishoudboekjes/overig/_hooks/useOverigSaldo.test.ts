import { renderHook } from "@testing-library/react";
import { useOverigSaldo } from "./useOverigSaldo";
import * as useCollectionModule from "../../../hooks/useCollection";

jest.mock("../../../hooks/useCollection");

describe("useOverigSaldo", () => {
  it("calculates totalInkomsten and totalUitgaven", () => {
    (useCollectionModule.useCollection as jest.Mock)
      .mockReturnValueOnce({
        items: [{ hoeveelheid: 100 }, { hoeveelheid: 50 }],
      })
      .mockReturnValueOnce({
        items: [{ hoeveelheid: 30 }, { hoeveelheid: 20 }],
      });

    const { result } = renderHook(() => useOverigSaldo("boekje-1", 1));
    expect(result.current.totalInkomsten).toBe(150);
    expect(result.current.totalUitgaven).toBe(50);
  });

  it("returns 0 for empty inkomsten/uitgaven", () => {
    (useCollectionModule.useCollection as jest.Mock)
      .mockReturnValueOnce({ items: [] })
      .mockReturnValueOnce({ items: [] });

    const { result } = renderHook(() => useOverigSaldo("boekje-1", 1));
    expect(result.current.totalInkomsten).toBe(0);
    expect(result.current.totalUitgaven).toBe(0);
  });
});
