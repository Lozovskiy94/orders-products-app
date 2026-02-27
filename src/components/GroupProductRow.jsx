import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/productsSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./GroupProductRow.css";

const GroupProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const isNew = product.isNew === 1;

  const handleAskDelete = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleConfirm = () => {
    dispatch(deleteProduct(product.id));
    setOpen(false);
  };

  return (
    <>
      <div className="group-product-row">
        <div className={`dot ${isNew ? "green" : "gray"}`} />

        <div className="img">🖥️</div>

        <div className="main">
          <div className="name">{product.title}</div>
          <div className="sn">SN-{product.serialNumber}</div>
        </div>

        <div className="status">{ isNew ? 'Новый' : 'Б/у'}</div>

        <button className="trash" title="Удалить" onClick={handleAskDelete}>
          🗑
        </button>
      </div>

      <ConfirmDeleteModal
        open={open}
        title="Вы уверены, что хотите удалить этот товар?"
        itemTitle={product.title}
        itemSubtitle={`SN-${product.serialNumber}`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default GroupProductRow;