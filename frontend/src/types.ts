export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface BasketItem extends Product {
  quantity: number;
}
