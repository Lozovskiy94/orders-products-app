import ProductRow from "./ProductRow";
import "./ProductsList.css";

const ProductsList = ({ products }) => {
  return (
    <div className="products-list">
      <div className="products-list-header">
        <div /> 
        <div>Название</div>
        <div>Состояние</div>
        <div>Гарантия</div>
        <div>Цена</div>
        <div>Тип</div>
        <div>Приход</div>
        <div />
      </div>

      {products.map((p) => (
        <ProductRow key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductsList;