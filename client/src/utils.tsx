export const getShopReviews = (shopId: string): Promise<any> => {
  return fetch(`/api/getShopReviews?shopId=${shopId}`)
    .then((res) => res.json())
    .then(({ data }) => {
      return data.shop;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createStarRating = (rating: string | number) => {
  const starArray = new Array(5);
  starArray
    .fill("full", 0, Math.floor(Number(rating)))
    .fill("empty", Math.floor(Number(rating)), 5);
  return starArray;
};

//relevance score calculator, which merges score prop with reviews
export const calculateAndAddRelevanceScore = (reviewArr: Review[]) => {
  const removeSpacesAndTabs = (comment: string) => {
    return comment.replace(/\s/g, "");
  };
  const removeNonAlphabetChars = (name: string) => {
    return name.replace(/\D/g, "");
  };
  let finalReviewArr: Review[] = reviewArr.map((review: Review) => {
    let relevanceScore = 0;

    if (review.comment) {
      let commentLength = removeSpacesAndTabs(review.comment).length;
      relevanceScore += commentLength >= 100 ? 100 : commentLength;
    }

    if (review.reviewer) {
      const { firstname, lastname } = review.reviewer.profile;
      relevanceScore +=
        firstname && lastname
          ? removeNonAlphabetChars(firstname).length > 1 &&
            removeNonAlphabetChars(lastname).length > 1
            ? 50
            : 25
          : 0;
    }
    return { ...review, relevanceScore };
  });

  return finalReviewArr;
};
