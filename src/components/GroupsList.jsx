import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedGroupId } from "../store/selectors";
import { selectGroup, clearSelectedGroup } from "../store/uiSlice";
import { deleteGroup } from "../store/groupsSlice";
import { deleteProductsByType } from "../store/productsSlice";

import GroupCard from "./GroupCard";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

import "./GroupsList.css";

const GroupsList = ({ groups }) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedGroupId);

  const [toDelete, setToDelete] = useState(null); 

  const handleConfirmDelete = () => {
    if (!toDelete) return;


    if (selectedId === toDelete.id) {
      dispatch(clearSelectedGroup());
    }


    dispatch(deleteProductsByType(toDelete.id));


    dispatch(deleteGroup(toDelete.id));

    setToDelete(null);
  };

  return (
    <>
      <div className="groups-list">
        {groups.map((g) => (
          <GroupCard
            key={g.id}
            group={g}
            active={g.id === selectedId}
            onClick={() => dispatch(selectGroup(g.id))}
            onDelete={(group) => setToDelete(group)}
          />
        ))}
      </div>

      <ConfirmDeleteModal
        open={!!toDelete}
        title="Вы уверены, что хотите удалить группу?"
        itemTitle={toDelete?.title}
        itemSubtitle={
          toDelete ? `${toDelete.products?.length ?? 0} товаров будет удалено` : ""
        }
        onCancel={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default GroupsList;