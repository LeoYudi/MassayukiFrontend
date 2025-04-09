export type ProductType = {
  name: string;
  price: number;
  id: number;
  category: {
    id: number,
    name: string,
    createdAt: string
  }
  description: string;
};
