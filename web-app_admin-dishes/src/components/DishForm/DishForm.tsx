import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./DishForm.css";
import { IDish } from "../../interfaces/IDish";

type Props = {
  submit: (dish: Omit<IDish, "id">) => void;
  dish?: Omit<IDish, "id">;
  closeClick: () => void;
};

const DishForm = ({ submit, dish, closeClick }: Props) => {
  const [localDish, setLocalDish] = useState<Omit<IDish, "id">>({
    name: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    if (dish) {
      setLocalDish(dish);
    }
  }, [dish]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLocalDish((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(localDish);
  };

  return (
    <form onSubmit={handleSubmit} className="DishForm">
      <h3>Add or edit dish information</h3>
      <input
        className="Input"
        type="text"
        name="name"
        placeholder="Dish Name"
        value={localDish.name}
        onChange={changeHandler}
        required
      />

      <input
        className="Input"
        type="text"
        name="price"
        placeholder="Price"
        value={localDish.price || ""}
        onChange={changeHandler}
        required
      />

      <input
        className="Input"
        type="text"
        name="image"
        placeholder="Image URL"
        value={localDish.image}
        onChange={changeHandler}
        required
      />
      {localDish.image && (
        <div className="photo-preview">
          <p>Photo preview</p>
          <img src={localDish.image} alt={localDish.name} />
        </div>
      )}
      <div className="controls">
        <button className="Button Success" type="submit">
          Save
        </button>
        <button className="Button Danger" type="button" onClick={closeClick}>
          Close
        </button>
      </div>
    </form>
  );
};

export default DishForm;
