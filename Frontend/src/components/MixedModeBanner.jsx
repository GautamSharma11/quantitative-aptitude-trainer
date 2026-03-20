// src/components/MixedModeBanner.jsx
import styles from "./MixedModeBanner.module.css";

export default function MixedModeBanner({ onStart }) {
  return (
    <section className={styles.banner}>

      <div className={styles.text}>
        <h3 className={styles.heading}>Ready for your next session?</h3>
        <p className={styles.body}>
          Review your progress from yesterday or jump straight into a
          mixed-mode challenge to test your agility across all operations.
        </p>
        <button className={styles.cta} onClick={onStart}>
          Start Mixed Mode
        </button>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewInner}>
          <div className={`${styles.shimmer} ${styles.shimmerShort}`} />
          <div className={`${styles.shimmer} ${styles.shimmerMid}`} />
          <div className={styles.questionBox}>45 + 32 = ?</div>
          <div className={`${styles.shimmer} ${styles.shimmerFull}`} />
        </div>
      </div>

    </section>
  );
}