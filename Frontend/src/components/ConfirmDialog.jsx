// src/components/ConfirmDialog.jsx
import styles from "./ConfirmDialog.module.css";
import Icon from "./Icon";

export default function ConfirmDialog({ title, message, confirmLabel = "Leave", cancelLabel = "Keep Going", onConfirm, onCancel }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>

        <div className={styles.iconWrap}>
          <Icon name="warning" className={styles.icon} />
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={styles.btnConfirm} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
}