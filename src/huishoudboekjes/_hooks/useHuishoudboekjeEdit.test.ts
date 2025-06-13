import { renderHook, act } from "@testing-library/react";
import { useHuishoudboekjeEdit } from "./useHuishoudboekjeEdit";
import * as AuthContext from "../../contexts/AuthContext";
import * as Service from "../../services/huishoudboekjeService";

jest.mock("../../contexts/AuthContext");
jest.mock("../../services/huishoudboekjeService");

const mockUser = { id: "user-1" };
const mockBoekje = { id: "boekje-1", naam: "Test" };

describe("usehuishoudboekjeEdit", () => {
  beforeEach(() => {
    (AuthContext.useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (Service.GetHuishoudboekjeById as jest.Mock).mockResolvedValue(mockBoekje);
    (Service.UpdateHuishoudboekje as jest.Mock).mockResolvedValue({});
    jest.clearAllMocks();
  });

  it("fetches boekje on mount", async () => {
    const { result } = renderHook(() => useHuishoudboekjeEdit("boekje-1"));
    expect(result.current.loading).toBe(true);
    await act(async () => {
      await Promise.resolve();
    });
    expect(Service.GetHuishoudboekjeById).toHaveBeenCalledWith(
      "boekje-1",
      mockUser.id
    );
    expect(result.current.boekje).toEqual(mockBoekje);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error if boekje not found", async () => {
    (Service.GetHuishoudboekjeById as jest.Mock).mockResolvedValue(null);
    const { result } = renderHook(() => useHuishoudboekjeEdit("boekje-2"));
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.error).toContain("niet gevonden");
    expect(result.current.boekje).toBeNull();
  });

  it("updates boekje", async () => {
    const { result } = renderHook(() => useHuishoudboekjeEdit("boekje-1"));
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await result.current.updateBoekje({ naam: "Nieuw" });
    });
    expect(Service.UpdateHuishoudboekje).toHaveBeenCalledWith({
      ...mockBoekje,
      naam: "Nieuw",
    });
    expect(result.current.boekje).toEqual({ ...mockBoekje, naam: "Nieuw" });
  });

  it("does not update if boekje is null", async () => {
    (Service.GetHuishoudboekjeById as jest.Mock).mockResolvedValue(null);
    const { result } = renderHook(() => useHuishoudboekjeEdit("boekje-2"));
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      await result.current.updateBoekje({ naam: "Nieuw" });
    });
    expect(Service.UpdateHuishoudboekje).not.toHaveBeenCalled();
  });
});
