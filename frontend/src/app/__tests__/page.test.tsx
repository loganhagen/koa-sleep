import { render, screen } from "@testing-library/react";
import Page from "../page";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("Home Page", () => {
  it("renders the main landing content", () => {
    render(<Page />);

    const mainHeading = screen.getByRole("heading", {
      name: /Koa/i,
      level: 2,
    });

    expect(mainHeading).toBeInTheDocument();
  });
});
