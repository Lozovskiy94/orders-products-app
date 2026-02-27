import "./ArrivalRow.css";

const ArrivalRow = ({ order, onDelete }) => {
  return (
    <div className="arrival-row">
      <div className="title">{order.title}</div>

      <div className="count">
        <div className="big">{order.count ?? 0}</div>
        <div className="small">Продукта</div>
      </div>

      <div className="date">{order.date}</div>

      <div className="sum">
        <div className="uah">
          {`${order.total ?? 0} ${order.currency ?? "UAH"}`}
        </div>
      </div>

      <button className="delete" onClick={onDelete} title="Удалить приход">🗑</button>
    </div>
  );
};

export default ArrivalRow;