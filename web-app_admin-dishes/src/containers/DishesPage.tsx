import {  useEffect, useState } from "react";
import { addDish, deleteDish, fetchDishes, updateDish } from "../API/dishes/dishesAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { RootState } from "../app/store/store";
import DishesList from "../components/DishesList/DishesList";
import Loader from "../components/Loader/Loader";
import Modal from "../components/UI/Modal/Modal";
import DishForm from "../components/DishForm/DishForm";
import { IDish } from "../interfaces/IDish";


const DishesPage = () => {
  const { loading, error, dishes } = useAppSelector(
    (state: RootState) => state.dishes
  );
  const [showErrorModal, setShowErrorModal] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedDish, setSelectedDish] = useState<IDish | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();


  useEffect(() => {
    void dispatch(fetchDishes());
  }, [dispatch]);

  const deleteHandler = async (id: string) => {
    await dispatch(deleteDish(id));
  };

  const editDishHandler = async (updatedDish:IDish) => {
		setShowEditModal(false);
		await dispatch(updateDish(updatedDish))
	};

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const addDishHandler = async (newDish:IDish) => {
    setShowAddModal(false);
    await dispatch(addDish(newDish));
  };

  const closeDishModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };


  const editClick = (id: string) => {
    const selectedDish = dishes.find((dish) => dish.id === id);
    if (selectedDish) {
      setSelectedDish(selectedDish);
      setShowEditModal(true);
    }
  };

  return (
    <>
      <Modal show={!!error && showErrorModal} close={closeErrorModal}>
        Error: {error}
      </Modal>

      <Modal show={showAddModal} close={closeDishModal}>
        <DishForm
          submit={(dish)=>addDishHandler(dish as IDish)}
          closeClick={closeDishModal}
        />
      </Modal>

      <Modal show={showEditModal} close={closeDishModal}>
        {selectedDish && (
          <DishForm
            submit={(dish)=>editDishHandler(dish as IDish)}
            dish={selectedDish as IDish}
            closeClick={closeDishModal}

          />
        )}
      </Modal>

      <DishesList
        dishes={dishes}
        deleteClick={deleteHandler}
        editClick={editClick}
        addDishClick={() => setShowAddModal(true)}
      />
      {loading && <Loader />}
    </>
  );
};

export default DishesPage;
