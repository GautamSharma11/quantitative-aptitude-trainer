// src/pages/TrainPage.jsx
import TrainerCard from "../components/TrainerCard";
import MixedModeBanner from "../components/MixedModeBanner";
import styles from "./TrainPage.module.css";

const TRAINERS = [
  { icon: "add",     category: "Arithmetic", title: "Addition"       },
  { icon: "remove",  category: "Arithmetic", title: "Subtraction"    },
  { icon: "close",   category: "Core Logic", title: "Multiplication" },
  { icon: "percent", category: "Core Logic", title: "Division"       },
];

export default function TrainPage({ onSelectTrainer }) {
  return (
    <main className={styles.main}>

      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>
          What will you{" "}
          <span className={styles.heroAccent}>master</span> today?
        </h1>
        <p className={styles.heroSub}>
          Select a trainer to begin your cognitive exercise. High-precision
          algorithms tailored to your current level.
        </p>
      </section>

      <section className={styles.grid}>
        {TRAINERS.map((t) => (
          <TrainerCard
            key={t.title}
            {...t}
            onClick={() => onSelectTrainer(t)}
          />
        ))}
      </section>

      <MixedModeBanner
        onStart={() => onSelectTrainer({ title: "Mixed", icon: "shuffle", category: "All" })}
      />

    </main>
  );
}