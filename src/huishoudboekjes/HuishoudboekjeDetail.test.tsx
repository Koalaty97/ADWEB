import React from "react";
import { render, screen } from "@testing-library/react";
import DetailHuishoudboekjePage from "./HuishoudboekjeDetail";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import useHuishoudboekjeDetail from "./_hooks/useHuishoudboekjeDetail";

jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));
jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("./_hooks/useHuishoudboekjeDetail");
jest.mock("./_components/MonthSelector", () => ({
  MonthSelector: ({ maand, onChange }: any) => (
    <div data-testid="month-selector" />
  ),
}));
jest.mock("./_components/DetailGrid", () => ({
  DetailGrid: (props: any) => <div data-testid="detail-grid" {...props} />,
}));
jest.mock("./participants/ParticipantsOverview", () => ({
  __esModule: true,
  default: ({ huishoudboekjeId, participants }: any) => (
    <div data-testid="participants" data-id={huishoudboekjeId} />
  ),
}));

describe("DetailHuishoudboekjePage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "boekje-1" });
    (useAuth as jest.Mock).mockReturnValue({ user: { id: "user-1" } });
    (useHuishoudboekjeDetail as jest.Mock).mockReturnValue({
      huishoudboekje: {
        id: "boekje-1",
        naam: "Test",
        participants: ["user-1", "user-2"],
        ownerId: "user-1",
      },
      loading: false,
      error: null,
      handleDragEnd: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("shows loading", () => {
    (useHuishoudboekjeDetail as jest.Mock).mockReturnValueOnce({
      huishoudboekje: null,
      loading: true,
      error: null,
      handleDragEnd: jest.fn(),
    });
    render(<DetailHuishoudboekjePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error if not found", () => {
    (useHuishoudboekjeDetail as jest.Mock).mockReturnValueOnce({
      huishoudboekje: null,
      loading: false,
      error: { message: "fail" },
      handleDragEnd: jest.fn(),
    });
    render(<DetailHuishoudboekjePage />);
    expect(screen.getByText(/niet gevonden/i)).toBeInTheDocument();
  });

  it("renders detail grid and participants", () => {
    render(<DetailHuishoudboekjePage />);
    expect(screen.getByTestId("month-selector")).toBeInTheDocument();
    expect(screen.getByTestId("detail-grid")).toBeInTheDocument();
    expect(screen.getByTestId("participants")).toHaveAttribute(
      "data-id",
      "boekje-1"
    );
  });
});
