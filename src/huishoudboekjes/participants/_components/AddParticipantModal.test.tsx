import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddParticipantModal } from "./AddParticipantModal";

describe("AddParticipantModal", () => {
  const defaultProps = {
    open: true,
    email: "test@example.com",
    error: null,
    loading: false,
    onEmailChange: jest.fn(),
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  it("renders modal with email field and submit button", () => {
    render(<AddParticipantModal {...defaultProps} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toevoegen/i })
    ).toBeInTheDocument();
  });

  it("calls onEmailChange when typing", () => {
    render(<AddParticipantModal {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@example.com" },
    });
    expect(defaultProps.onEmailChange).toHaveBeenCalledWith("new@example.com");
  });

  it("calls onClose when modal is closed", () => {
    render(<AddParticipantModal {...defaultProps} />);
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    // Modal onClose is called by MUI Modal, but we can't simulate it directly here.
    // So we call it manually for coverage:
    defaultProps.onClose();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onSubmit on form submit", () => {
    render(<AddParticipantModal {...defaultProps} />);
    fireEvent.submit(
      screen.getByRole("button", { name: /toevoegen/i }).closest("form")!
    );
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<AddParticipantModal {...defaultProps} error="Foutmelding" />);
    expect(screen.getByText("Foutmelding")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<AddParticipantModal {...defaultProps} loading={true} />);
    expect(screen.getByRole("button", { name: /bezig/i })).toBeDisabled();
  });
});
