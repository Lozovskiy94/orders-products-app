import "./ProductsHeader.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductTypes,
  selectTypeFilter,
  selectConditionFilter,
} from "../store/selectors";
import { setTypeFilter, setConditionFilter } from "../store/uiSlice";

const ProductsHeader = ({ total }) => {
  const dispatch = useDispatch();

  const types = useSelector(selectProductTypes);
  const typeValue = useSelector(selectTypeFilter);
  const conditionValue = useSelector(selectConditionFilter);

  return (
    <div className="products-header">
      <h1>Продукты / {total}</h1>

      <div className="filters">

        <select
          value={typeValue}
          onChange={(e) => dispatch(setTypeFilter(e.target.value))}
        >
          <option value="ALL">Тип: Все</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>


        <select
          value={conditionValue}
          onChange={(e) => dispatch(setConditionFilter(e.target.value))}
        >
          <option value="ALL">Спецификация: Все</option>
          <option value="NEW">Новый</option>
          <option value="USED">Б/У</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;