import React, { useState, useEffect } from "react";
import { getShopReviews, createStarRating } from "../utils";
import { Link } from "react-router-dom";
import Star from "./Star";

const SearchResult = ({ shop }: SearchResultProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    //exit early if undefined shop/props
    if (!shop || !shop.tsID) return;
    getShopReviews(shop.tsID)
      .then((shopWithReviews) => {
        setReviews(
          shopWithReviews.reviews
            .filter((singleReview: SingleReview) => singleReview.comment)
            .slice(0, 3)
        );
      })
      .catch((error) => console.log(error));
    return function cleanup() {
      setReviews([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { tsID, shopName, averageRating } = shop;
  return (
    <li className="ts-search-result__single-result" key={tsID}>
      <Link to={`/${tsID}`}>
        <h4 className="ts-search-result__single-result-name">{shopName}</h4>
      </Link>
      <p>Average Rating:</p>
      {createStarRating(averageRating).map((elem, i) => (
        <Star key={i} type={elem} />
      ))}
      <ul className="ts-search-result__result-review-list">
        {reviews &&
          reviews.map(({ UID, comment }: Review) => (
            <li
              className="ts-search-result__result-review-list-item"
              data-testid="search-result-result-review-list-item"
              key={UID}
            >
              - {comment}
            </li>
          ))}
      </ul>
    </li>
  );
};

export default SearchResult;
