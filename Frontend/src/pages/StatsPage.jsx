// src/pages/StatsPage.jsx
import styles from "./TrainPage.module.css"; /* reuse page layout */

export default function StatsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>
          Your <span className={styles.heroAccent}>Stats</span>
        </h1>
        <p className={styles.heroSub}>Stats page — coming soon.</p>
      </section>
    </main>
  );
}