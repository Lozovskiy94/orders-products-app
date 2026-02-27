import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupsFromProducts, selectSelectedGroupId } from "../store/selectors";
import { selectGroup } from "../store/uiSlice";

import GroupsHeader from "../components/GroupsHeader";
import GroupsList from "../components/GroupsList";
import GroupDetails from "../components/GroupDetails";

import "./GroupsPage.css";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroupsFromProducts);
  const selectedId = useSelector(selectSelectedGroupId);
  const didInitSelect = useRef(false);

  useEffect(() => {
    if (!didInitSelect.current && !selectedId && groups[0]) {
      dispatch(selectGroup(groups[0].id));
      didInitSelect.current = true;
    }
  }, [selectedId, groups, dispatch]);

  return (
    <div className="groups-page">
      <GroupsHeader total={groups.length} />

      <div className="groups-layout">
        <GroupsList groups={groups} />
        <GroupDetails />
      </div>
    </div>
  );
};

export default GroupsPage;