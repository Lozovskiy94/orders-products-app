import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrivalRow from "./ArrivalRow";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

import { deleteOrder } from "../store/ordersSlice";
import { clearOrderFromProducts } from "../store/productsSlice";
import { selectProducts } from "../store/selectors";

import "./ArrivalsList.css";

const ArrivalsList = ({ orders }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [toDelete, setToDelete] = useState(null); 

  const handleConfirmDelete = () => {
    if (!toDelete) return;


    dispatch(clearOrderFromProducts(toDelete.id));


    dispatch(deleteOrder(toDelete.id));

    setToDelete(null);
  };

  const productsCountForOrder = (orderId) =>
    products.filter((p) => p.order === orderId).length;

  return (
    <>
      <div className="arrivals-list">
        {orders.map((order) => (
          <ArrivalRow
            key={order.id}
            order={order}
            productsCount={productsCountForOrder(order.id)}
            onDelete={() => setToDelete(order)}
          />
        ))}
      </div>

      <ConfirmDeleteModal
        open={!!toDelete}
        title="Удалить приход?"
        itemTitle={toDelete?.title}
        itemSubtitle={
          toDelete
            ? `Будет удалён приход: ${toDelete.count ?? 0} шт., сумма ${toDelete.total ?? 0} ${toDelete.currency ?? "UAH"}`
            : ""
        }
        onCancel={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ArrivalsList;