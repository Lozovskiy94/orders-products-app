import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedGroupFromFiltered } from "../store/selectors";
import { addProduct } from "../store/productsSlice";
import { clearSelectedGroup } from "../store/uiSlice";

import GroupProductRow from "./GroupProductRow";
import AddProductModal from "./AddProductModal";
import "./GroupDetails.css";

import { AnimatePresence, motion } from "framer-motion";

const panelVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 16 },
};

const GroupDetails = () => {
  const dispatch = useDispatch();
  const group = useSelector(selectSelectedGroupFromFiltered);

  const [openAdd, setOpenAdd] = useState(false);

  const handleSubmit = (data) => {

    dispatch(addProduct({ type: group.id, ...data }));
    setOpenAdd(false);
  };

  return (
    <AnimatePresence mode="wait">
      {group ? (
        <motion.div
          key={group.id}
          className="group-details"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <button
            className="close"
            onClick={() => dispatch(clearSelectedGroup())}
            title="Закрыть"
          >
            ×
          </button>

          <h2 className="title">{group.title}</h2>


          <button className="add-product" onClick={() => setOpenAdd(true)}>
            <span className="plus">+</span> Добавить продукт
          </button>

          <div className="products">
            {group.products.map((p) => (
              <GroupProductRow key={p.id} product={p} />
            ))}
          </div>


          <AddProductModal
            open={openAdd}
            groupTitle={group.title}
            onCancel={() => setOpenAdd(false)}
            onSubmit={handleSubmit}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default GroupDetails;