// src/pages/ResultsPage.jsx
import styles from "./ResultsPage.module.css";
import Icon from "../components/Icon";

export default function ResultsPage({ results, trainer, config, onRetry, onHome }) {
  const { totalTime, avgTime, mistakes, total } = results;
  const correct  = total - mistakes;
  const accuracy = Math.round((correct / total) * 100);

  function grade() {
    if (accuracy === 100) return { label: "Perfect", color: "#0053dc" };
    if (accuracy >= 85)   return { label: "Excellent", color: "#0a6640" };
    if (accuracy >= 70)   return { label: "Good", color: "#5a6e0a" };
    if (accuracy >= 50)   return { label: "Fair", color: "#a86a00" };
    return                       { label: "Keep Practicing", color: "#a83836" };
  }

  const { label: gradeLabel, color: gradeColor } = grade();

  const stats = [
    { icon: "timer",            label: "Total Time",   value: `${totalTime}s` },
    { icon: "avg_pace",         label: "Avg / Question", value: `${avgTime}s` },
    { icon: "close",            label: "Mistakes",     value: mistakes },
    { icon: "check_circle",     label: "Correct",      value: correct },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.card}>

        {/* Grade badge */}
        <div className={styles.gradeBadge} style={{ color: gradeColor, borderColor: gradeColor }}>
          {gradeLabel}
        </div>

        {/* Accuracy ring */}
        <div className={styles.accuracyWrap}>
          <svg className={styles.ring} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" className={styles.ringBg} />
            <circle
              cx="60" cy="60" r="50"
              className={styles.ringFill}
              style={{
                strokeDasharray: `${2 * Math.PI * 50}`,
                strokeDashoffset: `${2 * Math.PI * 50 * (1 - accuracy / 100)}`,
                stroke: gradeColor,
              }}
            />
          </svg>
          <div className={styles.accuracyText}>
            <span className={styles.accuracyNum} style={{ color: gradeColor }}>{accuracy}%</span>
            <span className={styles.accuracyLabel}>Accuracy</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <Icon name={s.icon} className={styles.statIcon} />
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Session config recap */}
        <p className={styles.recap}>
          {trainer?.title} · {config?.count} questions · {config?.digits} digit{config?.digits !== 1 ? "s" : ""} · {config?.mode === "CHAINED" ? "Chained" : "Random"}
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.btnRetry} onClick={onRetry}>
            <Icon name="refresh" />
            Try Again
          </button>
          <button className={styles.btnHome} onClick={onHome}>
            <Icon name="home" />
            Home
          </button>
        </div>

      </div>
    </main>
  );
}