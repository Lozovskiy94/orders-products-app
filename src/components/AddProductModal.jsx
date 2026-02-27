import { useEffect, useState } from "react";
import "./AddProductModal.css";

const AddProductModal = ({ open, groupTitle, onCancel, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [specification, setSpecification] = useState("");
  const [priceUAH, setPriceUAH] = useState("");
  const [priceUSD, setPriceUSD] = useState("");

  useEffect(() => {
    if (!open) return;

    // reset при открытии
    setTitle("");
    setSerialNumber("");
    setIsNew(true);
    setSpecification("");
    setPriceUAH("");
    setPriceUSD("");

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // минимальная валидация
    if (!title.trim()) return alert("Введите название товара");
    if (!priceUAH || Number(priceUAH) <= 0) return alert("Введите цену (UAH)");

    onSubmit?.({
      title,
      serialNumber,
      isNew,
      specification,
      priceUAH,
      priceUSD,
    });
  };

  return (
    <div className="ap-overlay" onMouseDown={onCancel}>
      <div className="ap-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="ap-close" onClick={onCancel} title="Закрыть">×</button>

        <div className="ap-title">Добавить товар</div>
        <div className="ap-subtitle">Группа: <b>{groupTitle}</b></div>

        <form className="ap-form" onSubmit={handleSubmit}>
          <label className="ap-field">
            <span>Название</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className="ap-grid2">
            <label className="ap-field">
              <span>Serial Number</span>
              <input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            </label>

            <label className="ap-field">
              <span>Состояние</span>
              <select
                value={isNew ? "NEW" : "USED"}
                onChange={(e) => setIsNew(e.target.value === "NEW")}
              >
                <option value="NEW">Новый</option>
                <option value="USED">Б/У</option>
              </select>
            </label>
          </div>

          <label className="ap-field">
            <span>Спецификация</span>
            <input value={specification} onChange={(e) => setSpecification(e.target.value)} />
          </label>

          <div className="ap-grid2">
            <label className="ap-field">
              <span>Цена (UAH) *</span>
              <input
                inputMode="numeric"
                value={priceUAH}
                onChange={(e) => setPriceUAH(e.target.value)}
                placeholder="введите цену"
              />
            </label>

            <label className="ap-field">
              <span>Цена (USD)</span>
              <input
                inputMode="numeric"
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
                placeholder="введите цену"
              />
            </label>
          </div>

          <div className="ap-actions">
            <button type="button" className="ap-btn cancel" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="ap-btn primary">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;