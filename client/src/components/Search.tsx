import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  //isBeingSearched - allow text to be displayed while search is being run
  const [isBeingSearched, setIsBeingSearched] = useState<Boolean>(false);
  const [error, setError] = useState<Optional<string>>(null);
  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(0);

  const getAndSetSearchResults = (searchTerm: string, pageNumber: number) => {
    setIsBeingSearched(!isBeingSearched);

    fetch(
      `/api/getSearchResults?searchTerm=${searchTerm}&pageNumber=${pageNumber}`
    )
      .then((res) => res.json())
      .then((searchResults) => {
        const { shops, metaData } = searchResults;
        setSearchResults(shops);
        setMaxPages(metaData.totalPageCount);
        setIsBeingSearched(!isBeingSearched);
        setError(null);
        if (!shops.length) {
          setError(
            "No results found, please make sure to enter term and valid input"
          );
          setIsBeingSearched(false);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  //change search term on input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //reset results page to 0 on submission and get new search results

  const handleSubmission = (
    event: React.FormEvent<HTMLFormElement>,
    page?: number
  ) => {
    event.preventDefault();
    setPage(0);
    // setIsBeingSearched(true);
    getAndSetSearchResults(searchTerm, page ? page : 0);
  };

  const handleClear = () => {
    setIsBeingSearched(false);
    setSearchResults([]);
  };

  return (
    <div className="ts-search_container container">
      <Link to={"../"}>
        <button className="btn btn-dark ts-search__btn">
          Return to Reviews Page
        </button>
      </Link>
      <div className="row">
        <div className="col-sm-4">
          <form
            data-testid="form"
            className="form-inline"
            onSubmit={handleSubmission}
          >
            <div className="input-group">
              <input
                type="text"
                placeholder="Search For Shop"
                name="term"
                onChange={handleChange}
                className="form-control ts-search__text-input"
              />
              <input
                type="submit"
                data-testid="submit"
                className="btn btn-primary ts-search__btn"
                value="submit"
              />
            </div>
          </form>
        </div>
      </div>
      {/* fallback for while searching */}
      {isBeingSearched && !searchResults.length && (
        <div>
          <i>Please wait while results are being loaded</i>
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          {/* pagination functionality */}

          {page !== 0 && (
            <button
              onClick={() => {
                setPage(page - 1);
                getAndSetSearchResults(searchTerm, page - 1);
              }}
              className="btn btn-info ts-search__btn"
            >
              Previous Page
            </button>
          )}

          {page < maxPages - 1 && (
            <button
              onClick={() => {
                setPage(page + 1);
                getAndSetSearchResults(searchTerm, page + 1);
              }}
              className="btn btn-info ts-search__btn"
              data-testid="increment"
            >
              Next Page
            </button>
          )}

          {/* end pagination functionality */}
          <button
            className="btn btn-secondary ts-search__btn"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      )}
      {/* begin search results rendering */}

      {searchResults.length ? (
        <div>
          <p>
            <strong>These shops matched your search:</strong>
          </p>
          <ul className="ts-search__result-list">
            {searchResults.map((result: Shop) => (
              <SearchResult key={result.tsID} shop={result} />
            ))}
          </ul>
        </div>
      ) : (
        !isBeingSearched && (
          <p>
            <i>Please enter search term using alphabetical characters</i>
          </p>
        )
      )}
      {/* end search results rendering */}

      {/* error fallback */}
      {error && (
        <div>
          we couldn't find any results due to:
          <p>
            <strong>{error}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
