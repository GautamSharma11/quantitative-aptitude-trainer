// src/components/Footer.jsx
import styles from "./Footer.module.css";

const LINKS = ["Help", "Settings", "Privacy"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>Quantitative Aptitude Trainer</div>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <a key={link} href="#" className={styles.link}>{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}