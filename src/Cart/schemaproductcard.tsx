export interface CartUserData {
  cartid: number;
  userId: string;
  productid: number;
  product: {
    nameProduct: string;
    description: string;
    price: number;
    productDetails: {
      brand: string;
    };
    productThing: {
      imageURL: string;
    };
    attributeValues: {
      value: string;
      categoryAttribute: {
        key: string;
      };
    }[];
  };
}
