export interface IOrder {
  id: string;
  items: { [dishId: string]: number };
	totalPrice: number; 
}
