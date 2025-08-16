export interface WishlistItem {
  id: number;
  userId: string;
  productid: number;
  product: Product;
}

export interface Product {
  nameProduct: string;
  description: string;
  price: number;
  productThing: ProductThing;
  productDetails: ProductDetails;
  attributeValues: AttributeValue[];
}

export interface ProductThing {
  imageURL: string;
}

export interface ProductDetails {
  brand: string;
}

export interface AttributeValue {
  value: string;
  categoryAttribute: CategoryAttribute;
}

export interface CategoryAttribute {
  key: string;
}
