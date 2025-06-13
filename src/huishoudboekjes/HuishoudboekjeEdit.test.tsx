import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditHuishoudboekjePage from "./HuishoudboekjeEdit";
import { useParams, useNavigate } from "react-router";
import { useNotifier } from "../contexts/NotificationContext";
import { useHuishoudboekjeEdit } from "./_hooks/useHuishoudboekjeEdit";

jest.mock("react-router", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock("../contexts/NotificationContext", () => ({
  useNotifier: jest.fn(),
}));
jest.mock("./_hooks/useHuishoudboekjeEdit", () => ({
  useHuishoudboekjeEdit: jest.fn(),
}));
jest.mock("./_components/HuishoudboekjeForm", () => ({
  HuishoudboekjeForm: ({ initial, onSubmit }: any) => (
    <button
      onClick={() => onSubmit({ naam: "Test", omschrijving: "Omschrijving" })}
    >
      Submit
    </button>
  ),
}));

describe("EditHuishoudboekjePage", () => {
  const mockNavigate = jest.fn();
  const mockNotify = jest.fn();
  const mockUpdateBoekje = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "boekje-1" });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useNotifier as jest.Mock).mockReturnValue({ notify: mockNotify });
    (useHuishoudboekjeEdit as jest.Mock).mockReturnValue({
      boekje: { id: "boekje-1", naam: "Test", omschrijving: "Omschrijving" },
      loading: false,
      updateBoekje: mockUpdateBoekje,
    });
    jest.clearAllMocks();
  });

  it("renders loading if loading or boekje is missing", () => {
    (useHuishoudboekjeEdit as jest.Mock).mockReturnValueOnce({
      boekje: null,
      loading: true,
      updateBoekje: mockUpdateBoekje,
    });
    render(<EditHuishoudboekjePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error if id is missing", () => {
    (useParams as jest.Mock).mockReturnValueOnce({});
    render(<EditHuishoudboekjePage />);
    expect(screen.getByText(/id ontbreekt/i)).toBeInTheDocument();
  });

  it("renders form and handles update", async () => {
    render(<EditHuishoudboekjePage />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(mockUpdateBoekje).toHaveBeenCalledWith({
        naam: "Test",
        omschrijving: "Omschrijving",
      });
      expect(mockNotify).toHaveBeenCalledWith("Huishoudboekje aangepast");
      expect(mockNavigate).toHaveBeenCalledWith("/huishoudboekjes");
    });
  });

  it("handles updateBoekje error gracefully", async () => {
    mockUpdateBoekje.mockRejectedValueOnce(new Error("fail"));
    render(<EditHuishoudboekjePage />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(mockUpdateBoekje).toHaveBeenCalled();
      // Should not notify or navigate on error
      expect(mockNotify).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
