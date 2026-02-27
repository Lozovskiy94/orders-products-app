import "./ArrivalsHeader.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../store/ordersSlice";
import AddOrderModal from "./AddOrderModal";

const ArrivalsHeader = ({ total }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    dispatch(addOrder(data));
    setOpen(false);
  };

  return (
    <div className="arrivals-header">
      <div className="left">
        <button className="add-btn" onClick={() => setOpen(true)}>+</button>
        <h1>Приходы / {total}</h1>
      </div>

      <AddOrderModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ArrivalsHeader;