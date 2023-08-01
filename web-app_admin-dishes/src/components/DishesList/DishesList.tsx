import { IDish } from "../../interfaces/IDish";
import Button from "../UI/Button/Button";
import "./DishesList.css";

type Props = {
  dishes: IDish[];
  editClick: (id: string) => void;
  deleteClick: (id: string) => void;
  addDishClick: () => void;
};

const DishesList = ({
  dishes,
  editClick,
  deleteClick,
  addDishClick,
}: Props) => {
  return (
    <>
      <div className="page-header">
        <h1>Dishes</h1>
        <Button type="Add" onClick={addDishClick}>
          Add new Dish
        </Button>
      </div>
      <ul className="DishesList">
        {dishes.map((dish) => (
          <li key={dish.id} className="dish-card">
            <img src={dish.image} alt={dish.name} />
            <div className="dish-text">
              <h3>{dish.name}</h3>
              <p>{dish.price} тг</p>
            </div>
            <div className="controls">
              <Button type="Success" onClick={() => editClick(dish.id)}>
                Edit
              </Button>
              <Button type="Danger" onClick={() => deleteClick(dish.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DishesList;
