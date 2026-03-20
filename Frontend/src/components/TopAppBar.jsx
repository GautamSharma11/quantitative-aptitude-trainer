// src/components/TopAppBar.jsx
import Icon from "./Icon";
import styles from "./TopAppBar.module.css";

const NAV_ITEMS = ["Train", "Stats", "Goals"];

export default function TopAppBar({ activePage, onNavigate }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <button className={styles.brand} onClick={() => onNavigate("Train")}>
          <Icon name="calculate" className={styles.brandIcon} />
          Quantitative Aptitude Trainer
        </button>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`${styles.navBtn} ${activePage === item ? styles.navBtnActive : ""}`}
            >
              {item}
            </button>
          ))}
        </nav>

      </div>
      <div className={styles.divider} />
    </header>
  );
}