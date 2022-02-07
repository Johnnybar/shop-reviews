import React from "react";
import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";

const mockShopData = { tsID: "1", shopName: "name", averageRating: 3 };

describe("Search Result", () => {
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
  test("renders search result", () => {
    render(
      <BrowserRouter>
        <SearchResult key="key" shop={mockShopData} />
      </BrowserRouter>,
      container
    );
  });
  test("should display search result item with reviews after loading", () => {
    setTimeout(() => {
      const searchResultReviews = screen.getByTestId(
        "search-result-review-item"
      );
      expect(searchResultReviews).toBeInTheDocument();
    }, 0);
  });
});
