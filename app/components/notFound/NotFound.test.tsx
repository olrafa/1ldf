import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders a link back to the home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /voltar à página inicial/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
