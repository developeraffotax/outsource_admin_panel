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
    // Fixed container anchoring just the button area to the bottom-right
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 max-w-xs">
      
      {/* 
        Sleek Status Toast (Zero layout footprint when null)
        Animates smoothly right above the button 
      */}
      {saveMessage && (
        <div
          className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            isSuccess
              ? "bg-white/95 border-emerald-100 text-slate-800 shadow-emerald-100/20"
              : "bg-white/95 border-rose-100 text-slate-800 shadow-rose-100/20"
          }`}
        >
          {isSuccess ? (
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
          <span className="leading-tight truncate max-w-[200px]">{saveMessage}</span>
        </div>
      )}

      {/* Modern Floating Save Action Button */}
      <button
        type="submit"
        disabled={saving}
        className="group relative flex h-11 items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-800 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer"
      >
        {saving && (
          <svg
            className="h-4 w-4 animate-spin text-white"
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
        <span>{saving ? savingLabel : submitLabel}</span>
      </button>
    </div>
  );
}













































// type CmsSaveBarProps = {
//   saving: boolean;
//   saveMessage: string | null;
//   submitLabel?: string;
//   savingLabel?: string;
//   successMessage?: string;
// };

// export function CmsSaveBar({
//   saving,
//   saveMessage,
//   submitLabel = "Save changes",
//   savingLabel = "Saving...",
//   successMessage = "Saved successfully!",
// }: CmsSaveBarProps) {
//   const isSuccess = saveMessage === successMessage;

//   return (
//     <div className="cms-save-bar">
//       <button type="submit" disabled={saving} className="cms-btn-primary">
//         {saving && (
//           <svg
//             className="h-3.5 w-3.5 animate-spin"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             />
//           </svg>
//         )}
//         {saving ? savingLabel : submitLabel}
//       </button>

//       {saveMessage && (
//         <span
//           className={`cms-status ${isSuccess ? "cms-status-success" : "cms-status-error"}`}
//         >
//           {isSuccess ? (
//             <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           ) : (
//             <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           )}
//           {saveMessage}
//         </span>
//       )}
//     </div>
//   );
// }
