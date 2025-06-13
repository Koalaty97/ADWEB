import { renderHook, act } from "@testing-library/react";
import { useUitgavenData } from "./useUitgavenData";
import * as useUitgavenModule from "./useUitgaven";
import * as NotificationContext from "../../../contexts/NotificationContext";
import * as uitgavenService from "../../../services/uitgavenService";

jest.mock("./useUitgaven");
jest.mock("../../../contexts/NotificationContext");
jest.mock("../../../services/uitgavenService");

describe("useUitgavenData", () => {
  beforeEach(() => {
    (useUitgavenModule.useUitgaven as jest.Mock).mockReturnValue({
      items: [{ id: "u1" }],
      loading: false,
      error: null,
    });
    (NotificationContext.useNotifier as jest.Mock).mockReturnValue({
      notify: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("returns uitgaven, loading, loadError, and add", () => {
    const { result } = renderHook(() => useUitgavenData("h1", 1));
    expect(result.current.uitgaven).toEqual([{ id: "u1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.loadError).toBeNull();
    expect(typeof result.current.add).toBe("function");
  });

  it("add calls addUitgave and notify", async () => {
    const mockAddUitgave = uitgavenService.addUitgave as jest.Mock;
    const mockNotify = NotificationContext.useNotifier().notify;
    mockAddUitgave.mockResolvedValue({});
    const { result } = renderHook(() => useUitgavenData("h1", 1));
    await act(async () => {
      await result.current.add(10, new Date(), "cat1");
    });
    expect(mockAddUitgave).toHaveBeenCalled();
    expect(mockNotify).toHaveBeenCalledWith("Uitgave succesvol toegevoegd");
  });

  it("add handles error", async () => {
    const mockAddUitgave = uitgavenService.addUitgave as jest.Mock;
    mockAddUitgave.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useUitgavenData("h1", 1));
    await act(async () => {
      await result.current.add(10, new Date(), "cat1");
    });
    expect(mockAddUitgave).toHaveBeenCalled();
    // No throw, just logs error
  });
});
