// src/pages/TrainingSessionPage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./TrainingSessionPage.module.css";

export default function TrainingSessionPage({ sessionData, config, onFinish }) {
  const questions = sessionData.questions;
  const total     = questions.length;

  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [answer,         setAnswer]         = useState("");
  const [mistakes,       setMistakes]       = useState(0);
  const [shake,          setShake]          = useState(false);
  const [elapsed,        setElapsed]        = useState(0);      // total seconds
  const [questionTimes,  setQuestionTimes]  = useState([]);     // seconds per question

  const sessionStartRef  = useRef(Date.now());
  const questionStartRef = useRef(Date.now());
  const timerRef         = useRef(null);
  const inputRef         = useRef(null);

  /* ── Start global timer ── */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(((Date.now() - sessionStartRef.current) / 1000));
    }, 100);
    return () => clearInterval(timerRef.current);
  }, []);

  /* ── Focus input whenever question changes ── */
  useEffect(() => {
    questionStartRef.current = Date.now();
    inputRef.current?.focus();
  }, [currentIndex]);

  const currentQ = questions[currentIndex];
  const avgTime  = questionTimes.length
    ? (questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length).toFixed(1)
    : "—";

  /* ── Advance to next question or finish ── */
  const advance = useCallback((isCorrect) => {
    const qTime = (Date.now() - questionStartRef.current) / 1000;

    const newTimes    = [...questionTimes, qTime];
    const newMistakes = isCorrect ? mistakes : mistakes + 1;

    if (currentIndex + 1 >= total) {
      clearInterval(timerRef.current);
      const totalTime = (Date.now() - sessionStartRef.current) / 1000;
      onFinish({
        totalTime:  parseFloat(totalTime.toFixed(1)),
        avgTime:    parseFloat((newTimes.reduce((a, b) => a + b, 0) / newTimes.length).toFixed(1)),
        mistakes:   newMistakes,
        total,
      });
    } else {
      setQuestionTimes(newTimes);
      setMistakes(newMistakes);
      setCurrentIndex((i) => i + 1);
      setAnswer("");
    }
  }, [currentIndex, total, mistakes, questionTimes, onFinish]);

  /* ── Keyboard handler ── */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitAnswer();
      }
      if (e.key === " " && document.activeElement !== inputRef.current) {
        e.preventDefault();
        advance(false); // skip = mistake
        setAnswer("");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [answer, advance]);

  function submitAnswer() {
    const parsed = parseInt(answer, 10);
    if (isNaN(parsed)) return;

    if (parsed === currentQ.answer) {
      advance(true);
    } else {
      /* Wrong — shake and keep the question */
      setMistakes((m) => m + 1);
      setShake(true);
      setAnswer("");
      setTimeout(() => setShake(false), 500);
    }
  }

  const operator = currentQ.operator ?? "+";
  const progress = ((currentIndex) / total) * 100;

  return (
    <main className={styles.main}>

      {/* ── Stats bar ── */}
      <div className={styles.statsBar}>
        <div className={styles.statsGroup}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Live Timer</span>
            <span className={`${styles.statValue} ${styles.statValuePrimary}`}>
              {elapsed.toFixed(1)}s
            </span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Avg / Question</span>
            <span className={styles.statValue}>{avgTime === "—" ? "—" : `${avgTime}s`}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Mistakes</span>
            <span className={`${styles.statValue} ${mistakes > 0 ? styles.statValueError : ""}`}>
              {mistakes}
            </span>
          </div>
        </div>

        <div className={styles.focusBadge}>
          <span style={{ fontSize: "1rem", verticalAlign: "middle" }}>⚡</span>
          Focus Active
        </div>
      </div>

      {/* ── Question card ── */}
      <div className={styles.card}>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Math expression */}
        <div className={styles.mathDisplay}>
          <div className={styles.mathNum}>{currentQ.operand1}</div>
          <div className={styles.mathRow}>
            <span className={styles.mathOp}>{operator}</span>
            <span className={styles.mathNum}>{currentQ.operand2}</span>
          </div>
          <div className={styles.mathLine} />
        </div>

        {/* Answer input */}
        <div className={`${styles.inputWrap} ${shake ? styles.shake : ""}`}>
          <input
            ref={inputRef}
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submitAnswer())}
            placeholder="Type answer…"
            className={styles.input}
            autoFocus
          />
        </div>

        {/* Progress text */}
        <div className={styles.progressText}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressCount}>
            Question {currentIndex + 1} / {total}
          </span>
        </div>

      </div>

      {/* ── Keyboard hints ── */}
      <div className={styles.hints}>
        <span className={styles.hint}>Press Enter to submit</span>
        <span className={styles.hint}>Press Space to skip</span>
      </div>

    </main>
  );
}