import { useEffect } from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({
  open,
  title = "Вы уверены, что хотите удалить?",
  itemTitle,
  itemSubtitle,
  onCancel,
  onConfirm,
}) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div
        className="modal"
        onMouseDown={(e) => e.stopPropagation()} 
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onCancel} aria-label="Закрыть">
          ×
        </button>

        <div className="modal-title">{title}</div>

        <div className="modal-item">
          <div className="modal-dot" />
          <div className="modal-img">🖥️</div>

          <div className="modal-text">
            <div className="modal-item-title">{itemTitle}</div>
            {itemSubtitle ? <div className="modal-item-sub">{itemSubtitle}</div> : null}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onCancel}>
            ОТМЕНИТЬ
          </button>

          <button className="btn danger" onClick={onConfirm}>
            🗑 УДАЛИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;