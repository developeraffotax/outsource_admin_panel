import { useEffect, useMemo, useState, type CSSProperties } from "react";

type EntryPreloaderProps = {
  onComplete: () => void;
  minimumDurationMs?: number;
};

const ENTRY_HEADLINE = "Content Control Studio";
const MIN_EXIT_DELAY_MS = 900;
const EXIT_ANIMATION_LEAD_MS = 420;

const EntryPreloader = ({
  onComplete,
  minimumDurationMs = 1400,
}: EntryPreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const words = useMemo(() => ENTRY_HEADLINE.split(" "), []);

  useEffect(() => {
    const exitTimer = window.setTimeout(
      () => setIsExiting(true),
      Math.max(MIN_EXIT_DELAY_MS, minimumDurationMs - EXIT_ANIMATION_LEAD_MS),
    );
    const doneTimer = window.setTimeout(() => onComplete(), minimumDurationMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [minimumDurationMs, onComplete]);

  return (
    <div
      className={`cms-entry-preloader ${
        isExiting ? "cms-entry-preloader-exit" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label="Preparing content management workspace"
    >
      <div className="cms-entry-door cms-entry-door-left" aria-hidden="true" />
      <div className="cms-entry-door cms-entry-door-right" aria-hidden="true" />

      <div className="cms-entry-content">
        <p className="cms-entry-kicker">Initializing editor</p>
        <h1 className="cms-entry-title">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="cms-entry-word"
              style={{ "--cms-word-index": index } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </h1>
        <div className="cms-entry-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
};

export default EntryPreloader;
