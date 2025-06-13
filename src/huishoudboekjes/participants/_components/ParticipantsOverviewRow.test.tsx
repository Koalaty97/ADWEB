import React from "react";
import { render, screen } from "@testing-library/react";
import { ParticipantOverviewRow } from "./ParticipantsOverviewRow";

describe("ParticipantOverviewRow", () => {
  it("renders email in table cell", () => {
    render(<ParticipantOverviewRow email="test@example.com" />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });
});
