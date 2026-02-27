import "./GroupCard.css";

const GroupCard = ({ group, active, onClick, onDelete }) => {
  return (
    <div
      className={`group-card ${active ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="icon">≡</div>

      <div className="main">
        <div className="name">{group.title}</div>

        <div className="count">
          <div className="big">{group.products.length}</div>
          <div className="small">Продукта</div>
        </div>
      </div>

      <div className="date">06 / Окт / 2017</div>

      <div className="actions">
        <button
          type="button"
          className="trash"
          title="Удалить группу"
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete?.(group);
          }}
        >
          🗑
        </button>

        <div className="arrow">›</div>
      </div>
    </div>
  );
};

export default GroupCard;