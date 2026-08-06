const STEPS = ['Type', 'Details', 'Location', 'Contact'];

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {STEPS.map((label, index) => {
            const step = index + 1;
            const isComplete = step < currentStep;
            const isActive = step === currentStep;

            return (
              <div key={label} className="contents">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${
                      isComplete || isActive
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isComplete ? <CheckIcon /> : step}
                  </span>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      isActive ? 'text-brand-700' : isComplete ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {step < STEPS.length && (
                  <div className={`flex-1 h-0.5 mx-2 ${step < currentStep ? 'bg-brand-600' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
