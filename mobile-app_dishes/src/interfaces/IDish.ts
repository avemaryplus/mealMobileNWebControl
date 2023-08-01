export interface IDish {
  id: string;
  name: string;
  price: number ;
  image: string;
}

export interface IDishWithQuantity extends IDish {
  quantity: number;
}
