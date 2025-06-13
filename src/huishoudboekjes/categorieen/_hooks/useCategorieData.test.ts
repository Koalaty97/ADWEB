import { renderHook, act } from "@testing-library/react";
import { useCategorieData } from "./useCategorieData";
import * as useCategorieenModule from "./useCategorieen";
import * as NotificationContext from "../../../contexts/NotificationContext";
import * as categorieService from "../../../services/categorieService";

jest.mock("./useCategorieen");
jest.mock("../../../contexts/NotificationContext");
jest.mock("../../../services/categorieService");

describe("useCategorieData", () => {
  beforeEach(() => {
    (useCategorieenModule.useCategorieen as jest.Mock).mockReturnValue({
      items: [{ id: "cat1" }],
      loading: false,
      error: null,
    });
    (NotificationContext.useNotifier as jest.Mock).mockReturnValue({
      notify: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("returns categories, loading, loadError, and add", () => {
    const { result } = renderHook(() => useCategorieData("h1"));
    expect(result.current.categories).toEqual([{ id: "cat1" }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.loadError).toBeNull();
    expect(typeof result.current.add).toBe("function");
  });

  it("add calls addCategorie and notify", async () => {
    const mockAddCategorie = categorieService.addCategorie as jest.Mock;
    const mockNotify = NotificationContext.useNotifier().notify;
    mockAddCategorie.mockResolvedValue({});
    const { result } = renderHook(() => useCategorieData("h1"));
    await act(async () => {
      await result.current.add("Test", 100, undefined);
    });
    expect(mockAddCategorie).toHaveBeenCalled();
    expect(mockNotify).toHaveBeenCalledWith("Categorie succesvol toegevoegd");
  });

  it("add handles error", async () => {
    const mockAddCategorie = categorieService.addCategorie as jest.Mock;
    mockAddCategorie.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useCategorieData("h1"));
    await act(async () => {
      await result.current.add("Test", 100, undefined);
    });
    expect(mockAddCategorie).toHaveBeenCalled();
    // No throw, just logs error
  });
});
