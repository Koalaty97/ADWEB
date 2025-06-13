import { renderHook } from "@testing-library/react";
import { useUitgaven } from "./useUitgaven";
import * as useCollectionModule from "../../../hooks/useCollection";

jest.mock("../../../hooks/useCollection");

describe("useUitgaven", () => {
  it("returns uitgaven, loading, error", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [{ id: "u1" }],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useUitgaven("h1", 1));
    expect(result.current.items).toEqual([{ id: "u1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns loading and error from useCollection", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValueOnce({
      items: [],
      loading: true,
      error: new Error("fail"),
    });
    const { result } = renderHook(() => useUitgaven("h1", 1));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual(new Error("fail"));
  });
});
