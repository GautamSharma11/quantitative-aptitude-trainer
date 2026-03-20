// src/pages/GoalsPage.jsx
import styles from "./TrainPage.module.css"; /* reuse page layout */

export default function GoalsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>
          Your <span className={styles.heroAccent}>Goals</span>
        </h1>
        <p className={styles.heroSub}>Goals page — coming soon.</p>
      </section>
    </main>
  );
}