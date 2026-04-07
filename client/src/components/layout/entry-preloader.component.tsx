import { useEffect, useMemo, useState, type CSSProperties } from "react";

type EntryPreloaderProps = {
  onComplete: () => void;
  minimumDurationMs?: number;
};

const entryHeadline = "Content Control Studio";

const EntryPreloader = ({
  onComplete,
  minimumDurationMs = 1400,
}: EntryPreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const words = useMemo(() => entryHeadline.split(" "), []);

  useEffect(() => {
    const exitTimer = window.setTimeout(
      () => setIsExiting(true),
      Math.max(900, minimumDurationMs - 420),
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
