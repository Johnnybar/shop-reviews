import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getShopReviews,
  createStarRating,
  calculateAndAddRelevanceScore,
} from "../utils";
import info from "../assets/info.json";
import Star from "./Star";

const Home = () => {
  const { shopId } = useParams();
  const { initialShopId } = info;
  const [shop, setShop] = useState<ShopProps>({
    name: "",
    tsId: initialShopId,
  });
  const [reviews, setReviews] = useState<Review[]>([]);

  const sortAndSetReviews = (type: string, reviewArr: []) => {
    const types: SortTypes = {
      creationDate: "creationDate",
      relevanceScore: "relevanceScore",
    };
    const sortProperty = types[type as keyof SortTypes];
    const sorted = [...reviewArr].sort((a, b) =>
      //if property is a date, convert date to number and sort, otherwise sort directly

      sortProperty === "creationDate"
        ? Number(new Date(b[sortProperty])) - Number(new Date(a[sortProperty]))
        : b[sortProperty] - a[sortProperty]
    );
    setReviews(sorted);
  };

  useEffect(() => {
    getShopReviews(shopId ? shopId : shop.tsId).then((shopWithReviews) => {
      const finalReviews: Review[] = calculateAndAddRelevanceScore(
        shopWithReviews.reviews
      );
      sortAndSetReviews("creationDate", finalReviews as []);
      setShop(shopWithReviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ts-reviews-page container">
      <div className="row">
        <div className="col-sm-12">
          <h1>Reviews For</h1>
          {shop && (
            <h3>
              <i>{shop.name}</i>
            </h3>
          )}
          <div className="ts-reviews__btn-wrapper">
            {/* Check to see if any items are found*/}
            <Link to={"../search"}>
              <button className="btn btn-primary">Search For Shops</button>
            </Link>
            <select
              className="ts-reviews__select btn btn-light"
              onChange={(e) => {
                sortAndSetReviews(e.target.value, reviews as []);
              }}
            >
              <option value="creationDate">Creation Date</option>
              <option value="relevanceScore">Relevance Score</option>
            </select>
          </div>
          <ul className="ts-reviews__review-list">
            {reviews.length ? (
              reviews.map(
                (
                  { comment, creationDate, relevanceScore, mark }: Review,
                  i
                ) => (
                  <li className="ts-reviews__single-review" key={i}>
                    {createStarRating(mark).map((elem, i) => (
                      <Star key={i} type={elem} />
                    ))}
                    {comment && (
                      <p className="ts-reviews__single-review-field">
                        <strong>Review:</strong> {comment}
                      </p>
                    )}
                    <p className="ts-reviews__single-review-field">
                      <strong>Written on:</strong>{" "}
                      {String(new Date(creationDate))}
                    </p>
                    <p className="ts-reviews__single-review-field">
                      <strong>Relevance Score: </strong>
                      {relevanceScore}
                    </p>
                  </li>
                )
              )
            ) : (
              <div>Results are being populated</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
