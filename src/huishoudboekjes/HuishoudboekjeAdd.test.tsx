import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddHuishoudboekjePage from "./HuishoudboekjeAdd";
import { useNavigate } from "react-router";
import { useNotifier } from "../contexts/NotificationContext";
import { useAddHuishoudboekje } from "./_hooks/useHuishoudboekjeAdd";

// Mock dependencies
jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../contexts/NotificationContext", () => ({
  useNotifier: jest.fn(),
}));
jest.mock("./_hooks/useHuishoudboekjeAdd", () => ({
  useAddHuishoudboekje: jest.fn(),
}));
jest.mock("./_components/HuishoudboekjeForm", () => ({
  HuishoudboekjeForm: ({ onSubmit }: any) => (
    <button
      onClick={() => onSubmit({ naam: "Test", omschrijving: "Omschrijving" })}
    >
      Submit
    </button>
  ),
}));

describe("AddHuishoudboekjePage", () => {
  const mockNavigate = jest.fn();
  const mockNotify = jest.fn();
  const mockAddBoekje = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useNotifier as jest.Mock).mockReturnValue({ notify: mockNotify });
    (useAddHuishoudboekje as jest.Mock).mockReturnValue({
      addBoekje: mockAddBoekje,
      loading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  it("renders the form", () => {
    render(<AddHuishoudboekjePage />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("calls addBoekje, notifies, and navigates on submit", async () => {
    mockAddBoekje.mockResolvedValueOnce({});
    render(<AddHuishoudboekjePage />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockAddBoekje).toHaveBeenCalledWith({
        naam: "Test",
        omschrijving: "Omschrijving",
      });
      expect(mockNotify).toHaveBeenCalledWith("Huishoudboekje toegevoegd");
      expect(mockNavigate).toHaveBeenCalledWith("/huishoudboekjes");
    });
  });

  it("handles addBoekje error gracefully", async () => {
    mockAddBoekje.mockRejectedValueOnce(new Error("fail"));
    render(<AddHuishoudboekjePage />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockAddBoekje).toHaveBeenCalled();
      // Should not notify or navigate on error
      expect(mockNotify).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
