import * as functions from "../utils";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import Home from "./Home";

const mockResponse = {
  tsId: "X6A4AACCD2C75E430381B2E1C4CLASSIC",
  url: "www.test-classic.de",
  name: "test-classic.com",
  languageISO2: "de",
  targetMarketISO3: "DEU",
  reviews: [
    {
      changeDate: "2021-12-16T14:44:06+01:00",
      comment: "The shop is amazing!",
      confirmationDate: "2021-12-16T14:43:48+01:00",
      creationDate: "2021-12-16T14:43:48+01:00",
      criteria: [
        {
          mark: "5",
          markDescription: "EXCELLENT",
          type: "DELIVERY",
        },
        {
          mark: "5",
          markDescription: "EXCELLENT",
          type: "GOODS",
        },
        {
          mark: "5",
          markDescription: "EXCELLENT",
          type: "SERVICE",
        },
      ],
      mark: "5.00",
      markDescription: "EXCELLENT",
      UID: "ae3e6321106fa686e0feaadd878d8bfe",
      reviewer: {
        profile: {
          firstname: "Valera",
          lastname: "T.",
          city: "Köln",
          url: "https://www.trustedshops.com/user/es_ES/632af220ef56999a0bfaf5315374a8c9",
          avatar60URL:
            "https://avatar.trustedshops.com/avatar/60/632/632af220ef56999a0bfaf5315374a8c9.png",
        },
      },
      orderDate: "2021-12-16T00:00:00+01:00",
    },
  ],
};

describe("Home", () => {
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
  test("Should render initial review list with provided id", async () => {
    const mock = jest
      .spyOn(functions, "getShopReviews")
      .mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      container
    );

    expect(await screen.findByText(/The shop/)).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith("X6A4AACCD2C75E430381B2E1C4CLASSIC");
    mock.mockRestore();
  });
});
