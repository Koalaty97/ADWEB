import { renderHook, act } from "@testing-library/react";
import { useInkomenData } from "./useInkomenData";
import * as useInkomenModule from "./useInkomen";
import * as NotificationContext from "../../../contexts/NotificationContext";
import * as inkomstenService from "../../../services/inkomstenService";

jest.mock("./useInkomen");
jest.mock("../../../contexts/NotificationContext");
jest.mock("../../../services/inkomstenService");

describe("useInkomenData", () => {
  beforeEach(() => {
    (useInkomenModule.useInkomen as jest.Mock).mockReturnValue({
      items: [{ id: "i1" }],
      loading: false,
      error: null,
    });
    (NotificationContext.useNotifier as jest.Mock).mockReturnValue({
      notify: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("returns inkomsten, loading, error, and add", () => {
    const { result } = renderHook(() => useInkomenData("h1", 1));
    expect(result.current.inkomsten).toEqual([{ id: "i1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.add).toBe("function");
  });

  it("add calls addInkomst and notify", async () => {
    const mockAddInkomst = inkomstenService.addInkomst as jest.Mock;
    const mockNotify = NotificationContext.useNotifier().notify;
    mockAddInkomst.mockResolvedValue({});
    const { result } = renderHook(() => useInkomenData("h1", 1));
    await act(async () => {
      await result.current.add(10, new Date(), "cat1");
    });
    expect(mockAddInkomst).toHaveBeenCalled();
    expect(mockNotify).toHaveBeenCalledWith("Inkomst succesvol toegevoegd");
  });

  it("add handles error", async () => {
    const mockAddInkomst = inkomstenService.addInkomst as jest.Mock;
    mockAddInkomst.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useInkomenData("h1", 1));
    await act(async () => {
      await result.current.add(10, new Date(), "cat1");
    });
    expect(mockAddInkomst).toHaveBeenCalled();
    // No throw, just logs error
  });
});
