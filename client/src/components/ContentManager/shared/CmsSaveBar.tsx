type CmsSaveBarProps = {
  saving: boolean;
  saveMessage: string | null;
  submitLabel?: string;
  savingLabel?: string;
  successMessage?: string;
};

export function CmsSaveBar({
  saving,
  saveMessage,
  submitLabel = "Save changes",
  savingLabel = "Saving...",
  successMessage = "Saved successfully!",
}: CmsSaveBarProps) {
  const isSuccess = saveMessage === successMessage;

  return (
    <div className="cms-save-bar">
      <button type="submit" disabled={saving} className="cms-btn-primary">
        {saving && (
          <svg
            className="h-3.5 w-3.5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        )}
        {saving ? savingLabel : submitLabel}
      </button>

      {saveMessage && (
        <span
          className={`cms-status ${isSuccess ? "cms-status-success" : "cms-status-error"}`}
        >
          {isSuccess ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {saveMessage}
        </span>
      )}
    </div>
  );
}
