import { IDishWithQuantity } from "./IDish";

interface ICartItem extends IDishWithQuantity {
  itemTotalPrice?: number;
}

export default ICartItem;
