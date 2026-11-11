import { ImageSourcePropType } from "react-native";

export interface CategoriesTypes {
  id: number;
  name: string;
}

export interface ProductsTypes {
  id: number;
  name: string;
  category: string;
  label?: string;
  storeName: string;
  avgStar: number;
  totalStar: number;
  price: number;
  discountPrice?: number;
  img: ImageSourcePropType;
}

export interface FilterProductTypes extends ProductsTypes {
  quantity: number;
}

export interface CartTypes {
  product_id: number;
  quantity: number;
}

export interface CartTypesWithId extends CartTypes {
  id: number;
}
