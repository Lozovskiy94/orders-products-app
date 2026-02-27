import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/productsSlice";
import { selectOrders } from "../store/selectors";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./ProductRow.css";

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const orders = useSelector(selectOrders);

  const isNew = product.isNew === 1 || product.isNew === true;

  const defaultPrice = useMemo(
    () => product.price?.find((p) => p.isDefault === 1 || p.isDefault === true),
    [product.price]
  );

  const orderTitle = useMemo(() => {
    if (product.order == null) return "—";
    return orders.find((o) => o.id === product.order)?.title ?? `Order ${product.order}`;
  }, [orders, product.order]);

  const handleAskDelete = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleConfirm = () => {
    dispatch(deleteProduct(product.id));
    setOpen(false);
  };

  return (
    <>
      <div className="product-row">
        <div className={`dot ${isNew ? "green" : "gray"}`} />

        <div className="product-main">
          <div className="title">{product.title}</div>
          <div className="serial">SN {product.serialNumber}</div>
        </div>

        <div className="state">{isNew ? "Новый" : "Б/У"}</div>

        <div className="guarantee">
          c {product.guarantee.start}
          <br />
          по {product.guarantee.end}
        </div>

        <div className="price">
          {defaultPrice ? `${defaultPrice.value} ${defaultPrice.symbol}` : "—"}
        </div>

        <div className="group">{product.type}</div>

        <div className="arrival">{orderTitle}</div>

        <button className="delete" onClick={handleAskDelete} title="Удалить">
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

export default ProductRow;