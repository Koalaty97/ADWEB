import { HuishoudboekjeArchivedRow } from "./HuishoudboekjeArchivedRow";
import { render } from "../test-utils";

describe("HuishoudboekjeArchivedRow", () => {
  it("renders without crashing", () => {
    render(
      <HuishoudboekjeArchivedRow
        entry={{
          id: "123",
          isDeleted: false,
          naam: "dsad",
          omschrijving: "asd",
          ownerId: "33",
          participants: [],
        }}
      />,
    );
  });
});
