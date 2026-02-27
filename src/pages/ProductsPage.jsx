import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../store/selectors";

import ProductsHeader from "../components/ProductsHeader";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="products-page">
      <ProductsHeader total={products.length} />
      <ProductsList products={products} />
    </div>
  );
};

export default ProductsPage;