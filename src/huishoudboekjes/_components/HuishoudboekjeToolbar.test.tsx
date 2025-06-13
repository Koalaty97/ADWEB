import { HuishoudboekjeToolbar } from "./HuishoudboekjeToolbar";
import { MemoryRouter } from "react-router";
import { render } from "../test-utils";

describe("HuishoudboekjeToolbar", () => {
  it("renders toolbar buttons", () => {
    render(<HuishoudboekjeToolbar />);
  });
});
