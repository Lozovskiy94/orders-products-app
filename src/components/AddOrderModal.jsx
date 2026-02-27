import { useEffect, useState } from "react";
import "./AddOrderModal.css";

const toYmd = (d) => d.toISOString().slice(0, 10);

const AddOrderModal = ({ open, onCancel, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("1");
  const [total, setTotal] = useState("0");
  const [date, setDate] = useState(toYmd(new Date()));

  useEffect(() => {
    if (!open) return;

    setTitle("");
    setCount("1");
    setTotal("0");
    setDate(toYmd(new Date()));

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const t = title.trim();
    if (!t) return alert("Введите название прихода");

    const c = Number(count);
    if (!Number.isFinite(c) || c < 0) return alert("Количество должно быть числом (>= 0)");

    const sum = Number(total);
    if (!Number.isFinite(sum) || sum < 0) return alert("Цена должна быть числом (>= 0)");

    if (!date) return alert("Выберите дату");

    const dateTime = `${date} 12:00:00`;

    onSubmit?.({
      title: t,
      count: c,
      total: sum,
      date: dateTime,
    });
  };

  return (
    <div className="ao-overlay" onMouseDown={onCancel}>
      <div className="ao-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="ao-close" onClick={onCancel} title="Закрыть">×</button>

        <div className="ao-title">Добавить приход</div>

        <form className="ao-form" onSubmit={handleSubmit}>
          <label className="ao-field">
            <span>Название</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className="ao-grid2">
            <label className="ao-field">
              <span>Количество</span>
              <input
                inputMode="numeric"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </label>

            <label className="ao-field">
              <span>Цена (UAH)</span>
              <input
                inputMode="numeric"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </label>
          </div>

          <label className="ao-field">
            <span>Дата</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <div className="ao-actions">
            <button type="button" className="ao-btn cancel" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="ao-btn primary">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;