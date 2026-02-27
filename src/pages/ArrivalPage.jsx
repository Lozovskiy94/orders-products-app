import ArrivalsHeader from "../components/ArrivalsHeader";
import ArrivalsList from "../components/ArrivalsList";
import { useSelector } from "react-redux";
import { selectFilteredOrders } from "../store/selectors";

const ArrivalPage = () => {
  const orders = useSelector(selectFilteredOrders);

  return (
    <div className="arrivals-page">
      <ArrivalsHeader total={orders.length} />
      <ArrivalsList orders={orders} />
    </div>
  );
};

export default ArrivalPage;