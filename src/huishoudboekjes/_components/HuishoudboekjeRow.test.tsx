import { HuishoudboekjeRow } from "./HuishoudboekjeRow";
import { MemoryRouter } from "react-router";
import { render } from "../test-utils";

describe("HuishoudboekjeRow", () => {
  it("renders row with entry data", () => {
    const sampleEntry = {
      id: "1",
      naam: "Test Boekje",
      omschrijving: "Beschrijving",
      ownerId: "user1",
      participants: [],
      isDeleted: false,
    };
    render(<HuishoudboekjeRow entry={sampleEntry} />);
  });
});
