import { renderHook } from "@testing-library/react";
import { useInkomen } from "./useInkomen";
import * as useCollectionModule from "../../../hooks/useCollection";

jest.mock("../../../hooks/useCollection");

describe("useInkomen", () => {
  it("returns inkomsten, loading, error", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [{ id: "i1" }],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useInkomen("h1", 1));
    expect(result.current.items).toEqual([{ id: "i1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns loading and error from useCollection", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValueOnce({
      items: [],
      loading: true,
      error: new Error("fail"),
    });
    const { result } = renderHook(() => useInkomen("h1", 1));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual(new Error("fail"));
  });
});
