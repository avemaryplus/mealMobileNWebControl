import { IDish } from "../../interfaces/IDish";
import { IOrder } from "../../interfaces/IOrder";

import Button from "../UI/Button/Button";

type Props = {
  order: IOrder;
  deliveryPrice: number;
  comleteClick: () => void;
  dishes: IDish[];
};

const OrderCard = ({ order, deliveryPrice, comleteClick, dishes }: Props) => {
  const orderedDishes = order.items
    ? Object.keys(order.items).map((dishId) => ({
        id: dishId,
        quantity: order.items[dishId],
        ...dishes.find((dish) => dish.id === dishId),
      }))
    : [];

  return (
    <li className="OrderCard">
      <ul>
        {orderedDishes.map((item) => (
          <li key={item.id}>
            <p>
              {item.quantity} x {item.name}
            </p>
            <p>{(item.price ?? 0) * item.quantity} тг</p>
          </li>
        ))}
      </ul>
      <p>Delivery: {deliveryPrice} тг</p>
      <p>Order total: {order.totalPrice} тг</p>
      <Button type="Success" onClick={comleteClick}>
        Complete Order
      </Button>
    </li>
  );
};

export default OrderCard;
