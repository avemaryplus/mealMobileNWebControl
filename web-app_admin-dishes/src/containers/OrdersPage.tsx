import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { RootState } from "../app/store/store";
import { deleteOrder, fetchOrders } from "../API/orders/ordersAPI";
import OrderCard from "../components/OrderCard/OrderCard";
import { fetchDishes } from "../API/dishes/dishesAPI";
import Loader from "../components/Loader/Loader";

const OrdersPage = () => {
  const { orders, deliveryPrice, ordersLoading } = useAppSelector(
    (state: RootState) => state.orders
  );

  const { dishes, loading } = useAppSelector(
    (state: RootState) => state.dishes
  );

  const dispatch = useAppDispatch();

  function findDishPrice(dishId: string): number | undefined {
    const dish = dishes.find((dish) => dish.id === dishId);
    return dish ? dish.price : undefined;
  }

  const ordersWithTotalPrice = orders.map((order) => {
    const totalPrice = Object.keys(order.items).reduce((total, dishId) => {
      const quantity = order.items[dishId];
      const dishPrice = findDishPrice(dishId);
      if (dishPrice) total += quantity * dishPrice;
      return total;
    }, 0);

    return {
      ...order,
      totalPrice: totalPrice + deliveryPrice,
    };
  });

  useEffect(() => {
    const fetchAllData = async () => {
      await dispatch(fetchDishes());
      await dispatch(fetchOrders());
    };

    void fetchAllData();
  }, [dispatch]);

  const completeOrderHandler = async (id: string) => {
    await dispatch(deleteOrder(id));
  };

  return (
    <div className="OrdersPage">
      {ordersLoading && <Loader />}

      {!loading && (
        <ul>
          {ordersWithTotalPrice.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              dishes={dishes}
              deliveryPrice={deliveryPrice}
              comleteClick={() => completeOrderHandler(order.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
