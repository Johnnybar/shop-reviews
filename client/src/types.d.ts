declare module "@testing-library";
type handleChange = (e: React.ChangeEvent<any>) => void;
type Optional<T> = T | null;

interface SortTypes {
  creationDate: string;
  relevanceScore: string;
}
interface ShopProps {
  name: string;
  tsId: string;
}

interface Shop {
  tsID: string;
  shopName: string;
  averageRating: number;
}

interface Review {
  creationDate: string;
  relevanceScore: number;
  comment: string;
  mark: string;
  UID: string;
  reviewer: { profile: { firstname: string; lastname: string } };
}

interface SearchResultProps {
  shop: Shop;
  key: string;
}

interface SingleReview {
  comment: string;
}
