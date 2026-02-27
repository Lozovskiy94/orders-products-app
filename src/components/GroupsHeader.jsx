import "./GroupsHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../store/groupsSlice";
import { selectGroup } from "../store/uiSlice";
import { selectGroupsBase } from "../store/selectors";

const normalize = (s) => (s || "").trim().toLowerCase();

const GroupsHeader = ({ total }) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroupsBase);

  const handleAdd = () => {
    while (true) {
      const input = prompt("Название группы:", "New Group");
      if (input === null) return; 

      const title = input.trim();
      if (!title) continue; 

      const exists = groups.some((g) => normalize(g.title) === normalize(title));
      if (exists) {
        alert("Группа с таким названием уже существует. Введите другое название.");
        continue; 
      }

      dispatch(addGroup(title));
      dispatch(selectGroup(title)); 
      return;
    }
  };

  return (
    <div className="groups-header">
      <div className="left">
        <button className="add-btn" onClick={handleAdd}>
          +
        </button>
        <h1>Группы / {total}</h1>
      </div>
    </div>
  );
};

export default GroupsHeader;