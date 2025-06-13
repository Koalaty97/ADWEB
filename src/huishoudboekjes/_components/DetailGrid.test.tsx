import { DetailGrid } from "./DetailGrid";
import { render } from "../test-utils";

describe("DetailGrid", () => {
  it("renders grid with provided props", () => {
    const sample = {
      id: "1",
      naam: "Test Boekje",
      omschrijving: "Beschrijving",
      ownerId: "user1",
      participants: [],
      isDeleted: false,
    };
    const handleDragEnd = jest.fn();
    render(
      <DetailGrid
        huishoudboekje={sample}
        maand={3}
        isOwner={true}
        onDragEnd={handleDragEnd}
      />,
    );
  });
});
