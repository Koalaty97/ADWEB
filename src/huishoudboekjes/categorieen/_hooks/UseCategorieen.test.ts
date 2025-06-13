import { renderHook } from "@testing-library/react";
import { useCategorieen } from "./useCategorieen";
import * as useCollectionModule from "../../../hooks/useCollection";

jest.mock("../../../hooks/useCollection");

describe("useCategorieen", () => {
  it("returns categorieen, loading, error", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [{ id: "cat1" }],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useCategorieen("h1"));
    expect(result.current.items).toEqual([{ id: "cat1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns loading and error from useCollection", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValueOnce({
      items: [],
      loading: true,
      error: new Error("fail"),
    });
    const { result } = renderHook(() => useCategorieen("h1"));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual(new Error("fail"));
  });
});
