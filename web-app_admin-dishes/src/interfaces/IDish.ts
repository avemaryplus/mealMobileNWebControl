export interface IDish {
  id: string;
  name: string;
  price: number | undefined;
  image: string;
}

export interface IDishWithQuantity extends IDish {
  quantity: number;
}
