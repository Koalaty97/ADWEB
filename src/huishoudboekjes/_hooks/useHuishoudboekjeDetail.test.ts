import { renderHook } from "../test-utils";
import useHuishoudboekjeDetail from "../../huishoudboekjes/_hooks/useHuishoudboekjeDetail";
import { act } from "@testing-library/react";
import { updateInkomstCategorie } from "../../services/inkomstenService";
import { updateUitgaveCategorie } from "../../services/uitgavenService";

describe("useHuishoudboekjeDetail", () => {
  it("should be defined", () => {
    const { result } = renderHook(() =>
      useHuishoudboekjeDetail({ id: "dummy-id" })
    );
    expect(result.current).toBeDefined();
  });
});
jest.mock("../../hooks/useDocument", () => ({
  useDocument: jest.fn(() => ({
    data: { id: "dummy-id", naam: "Test" },
    loading: false,
    error: null,
  })),
}));
jest.mock("../../services/inkomstenService", () => ({
  updateInkomstCategorie: jest.fn(),
}));
jest.mock("../../services/uitgavenService", () => ({
  updateUitgaveCategorie: jest.fn(),
}));

describe("useHuishoudboekjeDetail handleDragEnd", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does nothing if active or over is missing", async () => {
    const { result } = renderHook(() =>
      useHuishoudboekjeDetail({ id: "dummy-id" })
    );
    await act(async () => {
      await result.current.handleDragEnd({
        active: null,
        over: { id: "cat1" },
      });
      await result.current.handleDragEnd({
        active: { id: "item1", data: { current: { source: "inkomens" } } },
        over: null,
      });
    });
    expect(updateInkomstCategorie).not.toHaveBeenCalled();
    expect(updateUitgaveCategorie).not.toHaveBeenCalled();
  });

  it("calls updateInkomstCategorie if source is 'inkomens'", async () => {
    const { result } = renderHook(() =>
      useHuishoudboekjeDetail({ id: "dummy-id" })
    );
    const event = {
      active: { id: 123, data: { current: { source: "inkomens" } } },
      over: { id: "target-cat" },
    };
    await act(async () => {
      await result.current.handleDragEnd(event);
    });
    expect(updateInkomstCategorie).toHaveBeenCalledWith("123", "target-cat");
    expect(updateUitgaveCategorie).not.toHaveBeenCalled();
  });

  it("calls updateUitgaveCategorie if source is 'uitgaven'", async () => {
    const { result } = renderHook(() =>
      useHuishoudboekjeDetail({ id: "dummy-id" })
    );
    const event = {
      active: { id: 456, data: { current: { source: "uitgaven" } } },
      over: { id: "target-cat" },
    };
    await act(async () => {
      await result.current.handleDragEnd(event);
    });
    expect(updateUitgaveCategorie).toHaveBeenCalledWith("456", "target-cat");
    expect(updateInkomstCategorie).not.toHaveBeenCalled();
  });
});
