import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

describe("Search", () => {
  let container: any;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  test("Should render Search page", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
      container
    );
  });
  it("displays fallback while results are loaded and results after loading", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
      container
    );
    const inputElement = screen.queryByPlaceholderText(
      "Search For Shop"
    ) as HTMLInputElement;
    userEvent.type(inputElement, "shop");
    userEvent.click(screen.getByTestId(/submit/i));
    expect(
      screen.getByText("Please wait while results are being loaded")
    ).toBeInTheDocument();
    setTimeout(() => {
      expect(
        screen.getByText("These shops matched your search")
      ).toBeInTheDocument();
    }, 0);
  });
});
