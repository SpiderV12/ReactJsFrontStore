interface AttributeValue {
  value: string;
  categoryAttribute: {
    key: string;
  };
}

interface ProductDetails {
  brand: string;
}

interface ProductThing {
  imageURL: string;
}

export interface ProductPageitem {
  attributeValues: AttributeValue[];
  count: number;
  description: string;
  nameProduct: string;
  price: number;
  productDetails: ProductDetails;
  productThing: ProductThing;
}
