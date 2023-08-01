import { IDish } from "../../interfaces/IDish";
import { IOrder } from "../../interfaces/IOrder";
import "./OrderCard.css";
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
          <li key={item.id} className="dish-info">
            <p>
              {item.quantity} x {item.name}
            </p>
            <p>
              <b>{(item.price ?? 0) * item.quantity} тг</b>
            </p>
          </li>
        ))}
      </ul>
      <div className="order-info">
        <p>Delivery: {deliveryPrice} тг</p>
        <p>
          <b>Order total: {order.totalPrice} тг</b>
        </p>
        <Button type="Success" onClick={comleteClick}>
          Complete Order
        </Button>
      </div>
    </li>
  );
};

export default OrderCard;
