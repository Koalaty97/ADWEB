import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ParticipantsOverview from "./ParticipantsOverview";
import { useNotifier } from "../../contexts/NotificationContext";
import { useParticipantsOverview } from "./_hooks/useParticipantsOverview";

jest.mock("../../contexts/NotificationContext", () => ({
  useNotifier: jest.fn(),
}));
jest.mock("./_hooks/useParticipantsOverview");
jest.mock("./_components/ParticipantsTable", () => ({
  ParticipantsTable: ({ onAddClick }: any) => (
    <button onClick={onAddClick}>Add</button>
  ),
}));
jest.mock("./_components/AddParticipantModal", () => ({
  AddParticipantModal: (props: any) =>
    props.open ? <button onClick={props.onSubmit}>ModalSubmit</button> : null,
}));

describe("ParticipantsOverview", () => {
  const mockNotify = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockSetEmail = jest.fn();
  const mockAddParticipant = jest.fn();

  beforeEach(() => {
    (useNotifier as jest.Mock).mockReturnValue({ notify: mockNotify });
    (useParticipantsOverview as jest.Mock).mockReturnValue({
      open: false,
      email: "",
      error: null,
      loading: false,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
      setEmail: mockSetEmail,
      addParticipant: mockAddParticipant,
    });
    jest.clearAllMocks();
  });

  it("renders ParticipantsTable and AddParticipantModal", () => {
    render(
      <ParticipantsOverview huishoudboekjeId="h1" participants={["a@b.com"]} />
    );
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls openModal when add button is clicked", () => {
    render(
      <ParticipantsOverview huishoudboekjeId="h1" participants={["a@b.com"]} />
    );
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it("calls addParticipant and notify on modal submit", async () => {
    (useParticipantsOverview as jest.Mock).mockReturnValue({
      open: true,
      email: "",
      error: null,
      loading: false,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
      setEmail: mockSetEmail,
      addParticipant: jest.fn().mockResolvedValue(true),
    });
    render(
      <ParticipantsOverview huishoudboekjeId="h1" participants={["a@b.com"]} />
    );
    fireEvent.click(screen.getByRole("button", { name: /modalsubmit/i }));
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith("Lid succesvol toegevoegd!");
    });
  });

  it("does not notify if addParticipant returns false", async () => {
    (useParticipantsOverview as jest.Mock).mockReturnValue({
      open: true,
      email: "",
      error: null,
      loading: false,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
      setEmail: mockSetEmail,
      addParticipant: jest.fn().mockResolvedValue(false),
    });
    render(
      <ParticipantsOverview huishoudboekjeId="h1" participants={["a@b.com"]} />
    );
    fireEvent.click(screen.getByRole("button", { name: /modalsubmit/i }));
    await waitFor(() => {
      expect(mockNotify).not.toHaveBeenCalled();
    });
  });
});
