// src/components/TrainerCard.jsx
import Icon from "./Icon";
import styles from "./TrainerCard.module.css";

export default function TrainerCard({ icon, category, title, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>

      <div className={styles.iconWrap}>
        <Icon name={icon} />
      </div>

      <div className={styles.meta}>
        <span className={styles.category}>{category}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.arrow}>
        <Icon name="arrow_forward_ios" />
      </div>

    </button>
  );
}