// src/App.jsx
import { useState } from "react";
import TopAppBar             from "./components/TopAppBar";
import Footer                from "./components/Footer";
import MobileFAB             from "./components/MobileFAB";
import ConfirmDialog         from "./components/ConfirmDialog";
import TrainPage             from "./pages/TrainPage";
import StatsPage             from "./pages/StatsPage";
import GoalsPage             from "./pages/GoalsPage";
import ConfigureSessionPage  from "./pages/ConfigureSessionPage";
import TrainingSessionPage   from "./pages/TrainingSessionPage";
import ResultsPage           from "./pages/ResultsPage";
import styles from "./App.module.css";

export default function App() {
  const [activePage,    setActivePage]    = useState("Train");
  const [view,          setView]          = useState("home");  // home | configure | session | results
  const [trainer,       setTrainer]       = useState(null);
  const [sessionData,   setSessionData]   = useState(null);
  const [sessionConfig, setSessionConfig] = useState(null);
  const [results,       setResults]       = useState(null);

  // Pending navigation — stored while the confirm dialog is open
  const [pendingNav,    setPendingNav]    = useState(null);  // { type: "page" | "home", page? }

  /* ─── Guard: only intercept when a session is actively running ─── */
  function isSessionActive() {
    return view === "session";
  }

  /* ─── TopAppBar nav clicks ─── */
  function handleNavigate(page) {
    if (isSessionActive()) {
      setPendingNav({ type: "page", page });
    } else {
      commitNavigate(page);
    }
  }

  function commitNavigate(page) {
    setActivePage(page);
    setView("home");
    setSessionData(null);
    setResults(null);
    setPendingNav(null);
  }

  /* ─── Trainer card click ─── */
  function handleSelectTrainer(t) {
    setTrainer(t);
    setView("configure");
  }

  /* ─── Session lifecycle ─── */
  function handleSessionStart(data, config) {
    setSessionData(data);
    setSessionConfig(config);
    setView("session");
  }

  function handleSessionFinish(res) {
    setResults(res);
    setView("results");
  }

  /* ─── Results actions ─── */
  function handleRetry() {
    setSessionData(null);
    setResults(null);
    setView("configure");
  }

  function handleHome() {
    setView("home");
    setActivePage("Train");
    setTrainer(null);
    setSessionData(null);
    setResults(null);
  }

  /* ─── Dialog callbacks ─── */
  function handleConfirmLeave() {
    if (!pendingNav) return;
    if (pendingNav.type === "page") {
      commitNavigate(pendingNav.page);
    } else {
      handleHome();
      setPendingNav(null);
    }
  }

  function handleCancelLeave() {
    setPendingNav(null);
  }

  /* ─── Render ─── */
  function renderView() {
    if (view === "configure") {
      return (
        <ConfigureSessionPage
          trainer={trainer}
          onStart={handleSessionStart}
        />
      );
    }
    if (view === "session" && sessionData) {
      return (
        <TrainingSessionPage
          sessionData={sessionData}
          config={sessionConfig}
          onFinish={handleSessionFinish}
        />
      );
    }
    if (view === "results" && results) {
      return (
        <ResultsPage
          results={results}
          trainer={trainer}
          config={sessionConfig}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      );
    }

    switch (activePage) {
      case "Stats":  return <StatsPage />;
      case "Goals":  return <GoalsPage />;
      default:       return <TrainPage onSelectTrainer={handleSelectTrainer} />;
    }
  }

  return (
    <div className={styles.app}>
      <TopAppBar activePage={activePage} onNavigate={handleNavigate} />

      {renderView()}

      <Footer />

      {view === "home" && (
        <MobileFAB onClick={() => handleSelectTrainer({ title: "Mixed", icon: "shuffle" })} />
      )}

      {/* Confirmation dialog — only mounts when there's a pending navigation */}
      {pendingNav && (
        <ConfirmDialog
          title="Abandon session?"
          message="You're in the middle of a session. Leaving now will lose your progress and timer."
          confirmLabel="Leave"
          cancelLabel="Keep Going"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </div>
  );
}