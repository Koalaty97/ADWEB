import { renderHook } from "@testing-library/react";
import useFilteredUitgaven from "./useFilteredUitgaven";
import * as useCollectionModule from "../../../hooks/useCollection";

jest.mock("../../../hooks/useCollection");

describe("useFilteredUitgaven", () => {
  it("returns uitgaven for given categorieIds", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [{ id: "u1", categorieId: "cat1" }],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useFilteredUitgaven(["cat1"]));
    expect(result.current.items).toEqual([{ id: "u1", categorieId: "cat1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns empty if categorieIds is empty", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useFilteredUitgaven([]));
    expect(result.current.items).toEqual([]);
  });
});
