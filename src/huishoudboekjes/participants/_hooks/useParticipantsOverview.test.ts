import { renderHook, act } from "@testing-library/react";
import { useParticipantsOverview } from "./useParticipantsOverview";
import * as AuthContext from "../../../contexts/AuthContext";
import * as Service from "../../../services/huishoudboekjeService";
import * as yup from "yup";

jest.mock("../../../contexts/AuthContext");
jest.mock("../../../services/huishoudboekjeService");

describe("useParticipantsOverview", () => {
  beforeEach(() => {
    (AuthContext.useAuth as jest.Mock).mockReturnValue({
      user: { id: "user-1" },
    });
    (Service.AddHuishoudeboekjeParticipant as jest.Mock).mockResolvedValue({});
    jest.clearAllMocks();
  });

  it("opens and closes modal", () => {
    const { result } = renderHook(() => useParticipantsOverview("boekje-1"));
    act(() => result.current.openModal());
    expect(result.current.open).toBe(true);
    act(() => result.current.closeModal());
    expect(result.current.open).toBe(false);
    expect(result.current.email).toBe("");
    expect(result.current.error).toBeNull();
  });

  it("sets email", () => {
    const { result } = renderHook(() => useParticipantsOverview("boekje-1"));
    act(() => result.current.setEmail("test@example.com"));
    expect(result.current.email).toBe("test@example.com");
  });

  it("adds participant successfully", async () => {
    const { result } = renderHook(() => useParticipantsOverview("boekje-1"));
    act(() => result.current.setEmail("test@example.com"));
    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.addParticipant();
    });
    expect(Service.AddHuishoudeboekjeParticipant).toHaveBeenCalledWith(
      "boekje-1",
      "user-1",
      "test@example.com"
    );
    expect(success).toBe(true);
    expect(result.current.open).toBe(false);
  });

  it("shows validation error for invalid email", async () => {
    const { result } = renderHook(() => useParticipantsOverview("boekje-1"));
    act(() => result.current.setEmail("not-an-email"));
    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.addParticipant();
    });
    expect(success).toBe(false);
    expect(result.current.error).toMatch(/email/i);
    expect(Service.AddHuishoudeboekjeParticipant).not.toHaveBeenCalled();
  });

  it("shows generic error on service failure", async () => {
    (Service.AddHuishoudeboekjeParticipant as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    const { result } = renderHook(() => useParticipantsOverview("boekje-1"));
    act(() => result.current.setEmail("test@example.com"));
    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.addParticipant();
    });
    expect(success).toBe(false);
    expect(result.current.error).toMatch(/niet kunnen toevoegen/i);
  });
});
