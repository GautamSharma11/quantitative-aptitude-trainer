// src/components/MobileFAB.jsx
import Icon from "./Icon";
import styles from "./MobileFAB.module.css";

export default function MobileFAB({ onClick }) {
  return (
    <div className={styles.fab}>
      <button className={styles.btn} onClick={onClick}>
        <Icon name="rocket_launch" />
      </button>
    </div>
  );
}