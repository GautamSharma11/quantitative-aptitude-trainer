// src/pages/ConfigureSessionPage.jsx
import { useState } from "react";
import Icon from "../components/Icon";
import { generateSession } from "../services/additionApi";
import styles from "./ConfigureSessionPage.module.css";

const COUNTS   = [10, 20, 30, 50];
const DIGITS   = [1, 2, 3, 4];
const MODES = [
  {
    id: "RANDOM",
    label: "Random Mode",
    desc: "Each question generates two random numbers for isolated processing.",
    badge: null,
  },
  {
    id: "CHAINED",
    label: "Chained Mode",
    desc: "The result of the previous question becomes the first number of the next.",
    badge: "Advanced",
  },
];

export default function ConfigureSessionPage({ trainer, onStart }) {
  const [count,    setCount]    = useState(10);
  const [digits,   setDigits]   = useState(1);
  const [mode,     setMode]     = useState("RANDOM");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await generateSession({ questionCount: count, digits, mode });
      onStart(data, { count, digits, mode });
    } catch (err) {
      setError("Could not reach server. Check your backend is running on :8080.");
    } finally {
      setLoading(false);
    }
  }

  /* Estimated duration: ~20s per question average */
  const estMinutes = Math.round((count * 20) / 60);

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* ── Left: Form ── */}
        <div className={styles.formSide}>
          <div className={styles.hero}>
            <h1 className={styles.heading}>Configure Session</h1>
            <p className={styles.sub}>
              Define your mathematical workspace parameters. Focus on
              precision, speed, and cognitive endurance.
            </p>
          </div>

          <form className={styles.card} onSubmit={handleSubmit}>

            {/* Quantity */}
            <section className={styles.section}>
              <label className={styles.sectionLabel}>Quantity of Problems</label>
              <div className={styles.countGrid}>
                {COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={`${styles.countBtn} ${count === n ? styles.countBtnActive : ""}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </section>

            {/* Digits */}
            <section className={styles.section}>
              <label className={styles.sectionLabel}>Numerical Complexity</label>
              <div className={styles.digitGrid}>
                {DIGITS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDigits(d)}
                    className={`${styles.digitBtn} ${digits === d ? styles.digitBtnActive : ""}`}
                  >
                    <span className={styles.digitNum}>{d}</span>
                    <span className={styles.digitLabel}>{d === 1 ? "Digit" : "Digits"}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Mode */}
            <section className={styles.section}>
              <label className={styles.sectionLabel}>Training Methodology</label>
              <div className={styles.modeList}>
                {MODES.map((m) => (
                  <label
                    key={m.id}
                    className={`${styles.modeRow} ${mode === m.id ? styles.modeRowActive : ""}`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={mode === m.id}
                      onChange={() => setMode(m.id)}
                      className={styles.radio}
                    />
                    <div className={styles.modeText}>
                      <div className={styles.modeTitleRow}>
                        <span className={styles.modeTitle}>{m.label}</span>
                        {m.badge && <span className={styles.badge}>{m.badge}</span>}
                      </div>
                      <span className={styles.modeDesc}>{m.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* CTA */}
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.ctaWrap}>
              <button type="submit" className={styles.cta} disabled={loading}>
                {loading ? "Generating…" : "Start Training"}
                {!loading && <Icon name="rocket_launch" className={styles.ctaIcon} />}
              </button>
              <p className={styles.estimate}>
                Estimated duration: ~{estMinutes} minute{estMinutes !== 1 ? "s" : ""}
              </p>
            </div>

          </form>
        </div>

        {/* ── Right: Summary panel (md+) ── */}
        <aside className={styles.summaryPanel}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryTrainer}>
              <Icon name={trainer?.icon ?? "add"} className={styles.summaryIcon} />
              <span>{trainer?.title ?? "Addition"}</span>
            </div>
            <ul className={styles.summaryList}>
              <li className={styles.summaryItem}>
                <span className={styles.summaryKey}>Questions</span>
                <span className={styles.summaryVal}>{count}</span>
              </li>
              <li className={styles.summaryItem}>
                <span className={styles.summaryKey}>Digits</span>
                <span className={styles.summaryVal}>{digits}</span>
              </li>
              <li className={styles.summaryItem}>
                <span className={styles.summaryKey}>Mode</span>
                <span className={styles.summaryVal}>{mode === "RANDOM" ? "Random" : "Chained"}</span>
              </li>
              <li className={styles.summaryItem}>
                <span className={styles.summaryKey}>Est. Time</span>
                <span className={styles.summaryVal}>~{estMinutes} min</span>
              </li>
            </ul>
            <div className={styles.summaryPreview}>
              {digits === 1 && <span>5 + 3 = <em>?</em></span>}
              {digits === 2 && <span>47 + 38 = <em>?</em></span>}
              {digits === 3 && <span>362 + 491 = <em>?</em></span>}
              {digits === 4 && <span>2847 + 1593 = <em>?</em></span>}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}