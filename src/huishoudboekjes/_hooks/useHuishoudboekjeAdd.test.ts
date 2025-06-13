import { renderHook, act } from "@testing-library/react";
import { useAddHuishoudboekje } from "./useHuishoudboekjeAdd";
import * as AuthContext from "../../contexts/AuthContext";
import * as HuishoudboekjeModel from "../../models/Huishoudboekje";
import * as Service from "../../services/huishoudboekjeService";

jest.mock("../../contexts/AuthContext");
jest.mock("../../models/Huishoudboekje");
jest.mock("../../services/huishoudboekjeService");

const mockUser = { id: "user-1" };

describe("useAddHuishoudboekje", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AuthContext.useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it("should return addBoekje, loading, and error", () => {
    const { result } = renderHook(() => useAddHuishoudboekje());
    expect(result.current).toHaveProperty("addBoekje");
    expect(result.current).toHaveProperty("loading", false);
    expect(result.current).toHaveProperty("error", null);
  });

  it("should call validation and service, set loading, and no error on success", async () => {
    (
      HuishoudboekjeModel.HuishoudboekjeSchema.validateSync as jest.Mock
    ).mockImplementation(() => {});
    (Service.AddHuishoudboekje as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useAddHuishoudboekje());
    await act(async () => {
      await result.current.addBoekje({ naam: "Test", omschrijving: "Desc" });
    });
    expect(
      HuishoudboekjeModel.HuishoudboekjeSchema.validateSync
    ).toHaveBeenCalledWith({ naam: "Test", omschrijving: "Desc" });
    expect(Service.AddHuishoudboekje).toHaveBeenCalledWith({
      naam: "Test",
      omschrijving: "Desc",
      ownerId: mockUser.id,
      participants: [],
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set loading true during async call", async () => {
    (
      HuishoudboekjeModel.HuishoudboekjeSchema.validateSync as jest.Mock
    ).mockImplementation(() => {});
    let resolvePromise: () => void;
    (Service.AddHuishoudboekje as jest.Mock).mockImplementation(
      () =>
        new Promise<void>((res) => {
          resolvePromise = res;
        })
    );
    const { result } = renderHook(() => useAddHuishoudboekje());
    act(() => {
      result.current.addBoekje({ naam: "Test", omschrijving: "Desc" });
    });
    expect(result.current.loading).toBe(true);
    act(() => {
      resolvePromise();
    });
  });
});
