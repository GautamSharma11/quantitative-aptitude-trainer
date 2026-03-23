// src/App.jsx
import { useState }                        from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import TopAppBar            from "./components/TopAppBar";
import Footer               from "./components/Footer";
import MobileFAB            from "./components/MobileFAB";
import ConfirmDialog        from "./components/ConfirmDialog";
import TrainPage            from "./pages/TrainPage";
import StatsPage            from "./pages/StatsPage";
import GoalsPage            from "./pages/GoalsPage";
import ConfigureSessionPage from "./pages/ConfigureSessionPage";
import TrainingSessionPage  from "./pages/TrainingSessionPage";
import ResultsPage          from "./pages/ResultsPage";
import styles from "./App.module.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Session state — passed between configure → session → results
  const [trainer,       setTrainer]       = useState(null);
  const [sessionData,   setSessionData]   = useState(null);
  const [sessionConfig, setSessionConfig] = useState(null);
  const [results,       setResults]       = useState(null);

  // Confirmation dialog — only shown when navigating away mid-session
  const [pendingNav,    setPendingNav]    = useState(null);

  const isSessionActive = location.pathname === "/addition/session";

  /* ─── TopAppBar nav ─── */
  function handleNavigate(page) {
    const path = page === "Train" ? "/" : `/${page.toLowerCase()}`;
    if (isSessionActive) {
      setPendingNav(path);
    } else {
      navigate(path);
    }
  }

  /* ─── Trainer selected on home ─── */
  function handleSelectTrainer(t) {
    setTrainer(t);
    navigate("/addition");
  }

  /* ─── Session starts ─── */
  function handleSessionStart(data, config) {
    setSessionData(data);
    setSessionConfig(config);
    navigate("/addition/session");
  }

  /* ─── Session finishes ─── */
  function handleSessionFinish(res) {
    setResults(res);
    navigate("/addition/results");
  }

  /* ─── Results actions ─── */
  function handleRetry() {
    setSessionData(null);
    setResults(null);
    navigate("/addition");
  }

  function handleHome() {
    setTrainer(null);
    setSessionData(null);
    setResults(null);
    navigate("/");
  }

  /* ─── Confirm dialog ─── */
  function handleConfirmLeave() {
    const dest = pendingNav;
    setPendingNav(null);
    navigate(dest);
  }

  function handleCancelLeave() {
    setPendingNav(null);
  }

  /* ─── Active nav tab ─── */
  function activeTab() {
    if (location.pathname.startsWith("/stats"))  return "Stats";
    if (location.pathname.startsWith("/goals"))  return "Goals";
    return "Train";
  }

  return (
    <div className={styles.app}>
      <TopAppBar activePage={activeTab()} onNavigate={handleNavigate} />

      <Routes>
        <Route path="/" element={
          <TrainPage onSelectTrainer={handleSelectTrainer} />
        } />
        <Route path="/stats"  element={<StatsPage />} />
        <Route path="/goals"  element={<GoalsPage />} />
        <Route path="/addition" element={
          <ConfigureSessionPage
            trainer={trainer}
            onStart={handleSessionStart}
          />
        } />
        <Route path="/addition/session" element={
          sessionData
            ? <TrainingSessionPage
                sessionData={sessionData}
                config={sessionConfig}
                onFinish={handleSessionFinish}
              />
            : <RedirectHome />
        } />
        <Route path="/addition/results" element={
          results
            ? <ResultsPage
                results={results}
                trainer={trainer}
                config={sessionConfig}
                onRetry={handleRetry}
                onHome={handleHome}
              />
            : <RedirectHome />
        } />
        {/* Catch-all */}
        <Route path="*" element={<RedirectHome />} />
      </Routes>

      <Footer />

      {location.pathname === "/" && (
        <MobileFAB onClick={() => handleSelectTrainer({ title: "Mixed", icon: "shuffle" })} />
      )}

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

// Redirect to home if someone lands on /session or /results directly without state
function RedirectHome() {
  const navigate = useNavigate();
  useState(() => { navigate("/"); });
  return null;
}